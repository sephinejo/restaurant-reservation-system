const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: 'Request body must have data property.' });
}

function hasFirstName(req, res, next) {
  const firstName = req.body.data.first_name;
  if (firstName) {
    return next();
  }
  next({
    status: 400,
    message: 'Reservation must include a first_name.',
  });
}

function hasLastName(req, res, next) {
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

  if (reservationDate && regex.test(reservationDate)) {
    return next();
  }
  next({
    status: 400,
    message:
      'Reservation must include a reservation_date in this format: MM/DD/YYYY.',
  });
}

function validateReservationTimeFormat(req, res, next) {
  const reservationTime = req.body.data.reservation_time;
  const regex = new RegExp(/[0-9]{2}:[0-9]{2}/);

  if (reservationTime && regex.test(reservationTime)) {
    return next();
  }
  next({
    status: 400,
    message:
      'Reservation must include a reservation_time in this format: HH:MM.',
  });
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
      'Reservation must indicate the number of people in a party, ranging from 1 to 6.',
  });
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
  const createdReservation = await service.create(newReservation);
  res.status(201).json({
    data: createdReservation,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    initializingErrorsObject,
    hasFirstName,
    hasLastName,
    hasMobileNumberInProperFormat,
    hasReservationDateInProperFormat,
    hasReservationTimeInProperFormat,
    hasPeopleInProperFormat,
    captureValidationErrors,
    asyncErrorBoundary(create),
  ],
};
