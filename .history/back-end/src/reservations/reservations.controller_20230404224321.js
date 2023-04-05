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
  const regex = new RegExp(/^[0-9 -]+$/);
  if (mobileNumber && mobileNumber.includes() !mobileNumber.includes()) {
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
      message: 'Reservations can only be made in the future.',
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

function validateCreateStatus(req, res, next) {
  const data = req.body.data;
  if (data.status === 'finished' || data.status === 'seated') {
    next({
      status: 400,
      message: `Reservation status cannot be set to ${data.status}.`,
    });
  }
  next();
}

function validateValidStatus(req, res, next) {
  const { status } = req.body.data;
  const validStatuses = ['booked', 'seated', 'finished', 'cancelled'];

  if (req.method === 'POST' && status && status !== 'booked') {
    next({
      status: 400,
      message: `New reservation cannot have status of ${status}.`,
    });
  }

  if (req.method === 'PUT' && status && !validStatuses.includes(status)) {
    next({
      status: 400,
      message: `A reservation cannot be updated if it has a status of ${status}.`,
    });
  }

  return next();
}

function validateStatusIsNotFinished(req, res, next) {
  const { reservation } = res.locals;
  if (reservation && reservation.status !== 'booked') {
    next({
      status: 400,
      message: `A ${reservation.status} reservation cannot be updated or cancelled.`,
    });
  }

  return next();
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
  const { date, mobile_number } = req.query;
  if (date) {
    const data = await service.list(date);
    res.json({ data });
  } else if (mobile_number) {
    const data = await service.search(mobile_number);
    res.json({ data });
  }
}

/**
 * Create handler for reservation resources
 */
async function create(req, res) {
  const newReservation = {
    ...req.body.data,
    status: 'booked',
  };
  const createdReservation = await service.create(newReservation);
  res.status(201).json({
    data: createdReservation,
  });
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
 * Read handler
 */
async function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({ data });
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
    validateCreateStatus,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    validateValidStatus,
    validateStatusIsNotFinished,
    asyncErrorBoundary(updateStatus),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExists),
    validateStatusIsNotFinished,
    validateFirstName,
    validateLastName,
    validateMobileNumberFormat,
    validateReservationDateFormat,
    validateDateNotInThePast,
    validateDateNotATuesday,
    validateReservationTimeFormat,
    validateTimeFrame,
    validateReservationPeopleFormat,
    asyncErrorBoundary(update),
  ],
};
