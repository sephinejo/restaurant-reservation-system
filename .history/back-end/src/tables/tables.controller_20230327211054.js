const service = require('./tables.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: 'Request body must have data property.' });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
