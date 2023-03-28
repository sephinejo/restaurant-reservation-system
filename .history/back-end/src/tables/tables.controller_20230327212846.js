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
  res.locals.tableName = tableName;
  if (tableName) {
    return next();
  }
  next({
    status: 400,
    message: 'Table must include a table_name.',
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

// List handler
async function list(req, res) {
  res.json({ data: await service.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasData],
};
