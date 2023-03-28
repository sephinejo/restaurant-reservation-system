const knex = require('../db/connection');

function list() {
  return knex('tables').select('*').orderBy('table_name');
}

function create(table) {
  return knex('tables')
    .insert(table, '*')
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  list,
  create,
};
