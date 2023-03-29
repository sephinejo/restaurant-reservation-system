const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Validation functions
function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: 'Request body must have data property.' });
}

function validateFirstName(req, res, next) {
  const firstName = req.body.data.first_name;
  if (firstName) {
    return next();
  }
  next({
    status: 400,
    message: 'Reservation must include a first_name.',
  });
}

function validateLastName(req, res, next) {
  const lastName = req.body.data.last_name;
  if (lastName) {
    return next();
  }
  next({
    status: 400,
    message: 'Reservation must include a last_name.',
  });
}

function validateMobileNumberFormat(req, res, next) {
  const mobileNumber = req.body.data.mobile_number;
  if (mobileNumber) {
    return next();
  }
  next({
    status: 400,
    message:
      'Reservation must include a mobile_number formatted as XXX-XXX-XXXX or XXX-XXXX.',
  });
}

function validateReservationDateFormat(req, res, next) {
  const reservationDate = req.body.data.reservation_date;
  const regex = new RegExp(/\d{4}-\d{2}-\d{2}/);
  res.locals.reservationDate = reservationDate;
  if (reservationDate && regex.test(reservationDate)) {
    return next();
  }
  next({
    status: 400,
    message:
      'Reservation must include a reservation_date in this format: MM/DD/YYYY.',
  });
}

function validateDateNotATuesday(req, res, next) {
  const { reservationDate } = res.locals;
  const day = new Date(reservationDate).getUTCDay();
  if (day === 2) {
    return next({
      status: 400,
      message:
        'Reservation cannot be made. Restaurant is closed on every Tuesday.',
    });
  }
  return next();
}

function validateDateNotInThePast(req, res, next) {
  const { reservationDate } = res.locals;
  const { reservation_time } = req.body.data;
  const currentDateAndTime = Date.now();
  const reservationDateAndTime = new Date(
    `${reservationDate} ${reservation_time}`
  );
  if (reservationDateAndTime < currentDateAndTime) {
    return next({
      status: 400,
      message: 'Reservations cannot be made in the past.',
    });
  }
  return next();
}

function validateReservationTimeFormat(req, res, next) {
  const reservationTime = req.body.data.reservation_time;
  const regex = new RegExp(/[0-9]{2}:[0-9]{2}/);
  res.locals.reservationTime = reservationTime;

  if (reservationTime && regex.test(reservationTime)) {
    return next();
  }
  next({
    status: 400,
    message:
      'Reservation must include a reservation_time in this format: HH:MM.',
  });
}

function validateTimeFrame(req, res, next) {
  const { reservationTime } = res.locals;
  const timeNum = reservationTime.replace(':', '');
  if (Number(timeNum) < 1030 || Number(timeNum) > 2130) {
    return next({
      status: 400,
      message:
        'The reservation time cannot be before 10:30 AM or after 9:30 PM.',
    });
  }
  return next();
}

function validateReservationPeopleFormat(req, res, next) {
  const people = req.body.data.people;
  const regex = new RegExp(/[^1-6]/);

  if (people && !regex.test(people) && typeof people === 'number') {
    return next();
  }
  next({
    status: 400,
    message:
      'Reservation must include a number of people, ranging from 1 to 6.',
  });
}

async function reservationExists(req, res, next) {
  const reservation = await service.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id: ${req.params.reservation_id} does not exist.`,
  });
}

//
function validateValidStatus(req, res, next) {
  const { status } = req.body.data;
  const validateStatus = ['booked', 'seated', 'finished', 'cancelled'];

  if (req.method === 'POST' && status && status !== 'booked') {
    next({
      status: 400,
      message: `New reservation cannot have status of ${status}.`,
    });
  }
  return next();
}

/**
 * Update handler
 */
async function update(req, res) {
  const updatedReservation = req.body.data;
  const data = await service.update(updatedReservation);
  res.json({ data });
}

/**
 * Update status handler
 */
async function updateStatus(req, res) {
  const { reservation } = res.locals;
  const reservationWithNewStatus = {
    ...reservation,
    status: req.body.data.status,
  };
  const data = await service.update(reservationWithNewStatus);
  res.json({ data });
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  if (date) {
    const data = await service.list(date);
    res.json({ data });
  }
}

/**
 * Create handler for reservation resources
 */
async function create(req, res) {
  const createdReservation = await service.create(req.body.data);
  res.status(201).json({
    data: createdReservation,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    validateFirstName,
    validateLastName,
    validateMobileNumberFormat,
    validateReservationDateFormat,
    validateDateNotATuesday,
    validateDateNotInThePast,
    validateReservationTimeFormat,
    validateTimeFrame,
    validateReservationPeopleFormat,
    asyncErrorBoundary(create),
  ],
};
