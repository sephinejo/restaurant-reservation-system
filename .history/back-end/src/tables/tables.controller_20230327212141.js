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
  if (tableName) {
    return next();
  }
  next({
    status: 400,
'Table must include a first_name.',
  });
}

// List handler
async function list(req, res) {
  res.json({ data: await service.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [hasData],
};
