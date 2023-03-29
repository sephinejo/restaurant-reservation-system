const knex = require('../db/connection');

function list() {
  return knex('tables').select('*').orderBy('table_id');
}

function create(table) {
  return knex('tables')
    .insert(table, '*')
    .then((createdRecords) => createdRecords[0]);
}

// async function d

module.exports = {
  list,
  create,
};
