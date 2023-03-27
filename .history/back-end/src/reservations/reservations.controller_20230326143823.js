const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const VALID_PROPERTIES = [
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people',
];

/**
 * Validation functions
 */
function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: 'Reqeust body must have data property. ' });
}

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(
            `Reservation must incldue a valid '${property}'.`
          );
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
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
      'Reservation must include a reservation_date in this format: YYYY-MM-DD.',
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

function validateMobileNumberFormat(req, res, next) {
  const mobileNumber = req.body.data.mobile_number;
  const regex = new RegExp(/[0-9]{3}-[0-9]{3}-[0-9]{4}/);
  if (mobileNumber && regex.test(mobileNumber)) {
    return next();
  }
  next({
    status: 400,
    message:
      'Reservation must include a mobile_number in this format: XXX-XXX-XXXX.',
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
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasData,
    hasProperties(VALID_PROPERTIES),
    asyncErrorBoundary(create),
  ],
};
