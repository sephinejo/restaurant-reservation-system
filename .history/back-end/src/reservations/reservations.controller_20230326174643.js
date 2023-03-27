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
    validateReservationDateFormat,
    validateReservationTimeFormat,
    validateMobileNumberFormat,
    validatePeopleFormat,
    asyncErrorBoundary(create),
  ],
};
