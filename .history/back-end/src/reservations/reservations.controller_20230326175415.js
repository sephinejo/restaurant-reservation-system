const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: 'Request body must have data property.' });
}

function initializingErrorsObject(req, res, next) {
  let errors = {
    status: 400,
    message: [],
  };
  res.locals.errors = errors;
  return next();
}

function hasFirstName(req, res, next) {
  const firstName = req.body.data.first_name;
  if (firstName) {
    return next();
  }
  const { errors } = res.locals;
  errors.message.push('Reservation must include a first_name.');
  return next();
}

function hasLastName(req, res, next) {
  const lastName = req.body.data.last_name;
  if (lastName) {
    return next();
  }
  const { errors } = res.locals;
  errors.message.push('Reservation must include a last_name.');
  return next();
}

function hasMobileNumberInProperFormat(req, res, next) {
  const mobileNumber = req.body.data.mobile_number;
  if (mobileNumber) {
    return next();
  }
  const { errors } = res.locals;
  errors.message.push(
    'Reservation must include a mobile_number formatted as XXX-XXX-XXXX or XXX-XXXX.'
  );
  return next();
}

function hasReservationDateInProperFormat(req, res, next) {
  const reservationDate = req.body.data.reservation_date;
  const regex = new RegExp(/\d{4}-\d{2}-\d{2}/);
  res.locals.reservationDate = reservationDate;
  if (reservationDate && regex.test(reservationDate)) {
    return next();
  }
  const { errors } = res.locals;
  errors.message.push(
    'Reservation must include a reservation_date in this format: MM/DD/YYYY.'
  );
  return next();
}

function hasReservationTimeInProperFormat(req, res, next) {
  const reservationTime = req.body.data.reservation_time;
  const regex = new RegExp(/[0-9]{2}:[0-9]{2}/);
  res.locals.reservationTime = reservationTime;

  if (reservationTime && regex.test(reservationTime)) {
    return next();
  }

  const { errors } = res.locals;
  errors.message.push(
    'Reservation must include a reservation_time in this format: HH:MM.'
  );
  return next();
}

function hasPeopleInProperFormat(req, res, next) {
  const people = req.body.data.people;
  const regex = new RegExp(/[^1-6]/);
  if (people && !regex.test(people) && typeof people === 'number') {
    return next();
  }

  const { errors } = res.locals;
  errors.message.push(
    'Reservation must indicate the number of people in a party, ranging from 1 to 6.'
  );
  return next();
}

/**
 * Create handler for reservation resources
 */
async function create(req, res) {
  const data = await service.create(req.body.data);
  data.people = Number(data.people);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasProps, asyncErrorBoundary(create)],
};
