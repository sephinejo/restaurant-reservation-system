const service = require('./tables.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Validation functions
function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: 'Request body must have data property.' });
}

function validateTableName(req, res, next) {
  const tableName = req.body.data.table_name;
  res.locals.tableName = tableName;
  if (tableName) {
    return next();
  }
  next({
    status: 400,
    message: 'Table must include a table_name.',
  });
}

function validateNameLength(req, res, next) {
  const { tableName } = res.locals;
  if (tableName && tableName.length >= 2) {
    return next();
  }
  next({
    status: 400,
    message: 'The table_name must be at least 2 characters long.',
  });
}

function validateCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (capacity && typeof capacity === 'number' && capacity >= 1) {
    return next();
  }
  next({
    status: 400,
    message: 'Table capacity must be at least 1.',
  });
}

async function validateNameIsNew(req, res, next) {
  const { tableName } = res.locals;
  const existingNames = await service
    .list()
    .find((table) => table.table_name === tableName);
  if (existingNames) {
    return next({
      status: 400,
      message: 'This table name already exists. Please choose a new one.',
    });
  }
  next();
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(Number(table_id));
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table with id: ${table_id} does not exist.`,
  });
}

function validateReservaionId(req, res, next) {
  const { reservation_id } = req.body.data;
  if (reservation_id) {
    res.locals.reservationId = reservation_id;
    return next();
  }
  next({
    status: 400,
    message: `The reservation_id is missing from the request body.`,
  });
}

async function reservationExists() {
  const { reservationId } = res.locals;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id ${reservationId} does not exist.`,
  });
}

function validateReservationSeated(req, res, next) {
  const { reservation, reservationId } = res.locals;
  if (reservation && reservationId && reservation.status === 'seated') {
    return next({
      status: 400,
      message: `Reservation ${reservationId} has already been seated.`,
    });
  }
  return next();
}

function validateTableOccupied(req, res, next) {
  const { table } = res.locals;
  if (table && table.reservation_id) {
    if (req.method === 'DELETE') {
      return next();
    }

    if (req.method === 'PUT') {
      next({
        status: 400,
        message: `Table ${table.table_name} is currently occupied.`,
      });
    }
  }

  if (req.method === 'DELETE') {
    next({
      status: 400,
      message: 'Table is currently not occupied.',
    });
  }

  if (req.method === 'PUT') {
    return next();
  }
}

// Table Seat Update handler
async function updateTableSeat(req, res) {
  const data = await service.updateTableSeat(
    res.locals.table.table_id,
    res.locals.reservation.resrvation_id
  );
  res.status(200).json({ data });
}

// Read handler
async function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({ data });
}

// Create handler
async function create(req, res) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({
    data: newTable,
  });
}

// List handler
async function list(req, res) {
  res.json({ data: await service.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    validateTableName,
    validateNameLength,
    asyncErrorBoundary(validateNameIsNew),
    validateCapacity,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(read)],
  update: [
    hasData,
    asyncErrorBoundary(tableExists),
    validateReservaionId,
    asyncErrorBoundary(reservationExists),
    validateReservationSeated,
    validateTableOccupied,
    asyncErrorBoundary(updateTableSeat),
  ],
  delete: [asyncErrorBoundary(tableExists), validateTableOccupied], asyncErrorBoundary(destroy),
};
