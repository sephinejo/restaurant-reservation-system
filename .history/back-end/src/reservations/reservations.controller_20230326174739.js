const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

function isValidDate(dateString) {
  const dateArr = dateString.split('-');
  const boolCheck =
    dateArr.length === 3 &&
    dateArr[0].length === 4 &&
    dateArr[1].length === 2 &&
    dateArr[2].length === 2;
  return boolCheck ? true : false;
}

function isValidTime(timeString) {
  const timeArr = timeString.split(':');
  const boolCheck =
    timeArr.length === 2 && timeArr[0].length === 2 && timeArr[1].length === 2;
  return boolCheck ? true : false;
}

async function hasProps(req, res, next) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    } = {},
  } = req.body;
  if (!first_name || first_name === '') {
    next({
      status: 400,
      message: 'Reservation must include a valid first_name',
    });
  }
  if (!last_name || last_name === '') {
    next({
      status: 400,
      message: 'Reservation must include a valid last_name',
    });
  }
  if (!mobile_number || mobile_number === '') {
    next({ status: 400, message: 'Reservation must include a mobile_number' });
  }
  if (
    !reservation_date ||
    reservation_date === '' ||
    !isValidDate(reservation_date)
  ) {
    next({
      status: 400,
      message: 'Reservation must include a valid reservation_date',
    });
  }
  if (
    !reservation_time ||
    reservation_time === '' ||
    !isValidTime(reservation_time)
  ) {
    next({
      status: 400,
      message: 'Reservation must include a valid reservation_time',
    });
  }
  if (!people || people === 0 || !(typeof people === typeof 1)) {
    next({
      status: 400,
      message: 'Reservation must include one or more people',
    });
  }
  return next();
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
  data.people = Number(data.people);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasProps, asyncErrorBoundary(create)],
};
