const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  // const { date } = req.query;
  // if (date) {
  //   const data = await service.list(date);
  //   res.json({ data });
  // } else {
  const data = await service.list();
  res.json({ data });
  // }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
