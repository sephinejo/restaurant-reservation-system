const knex = require('../db/connection');

function list() {
  return knex('tables').select('*').orderBy('table_id');
}

function create(table) {
  return knex('tables')
    .insert(table, '*')
    .then((createdRecords) => createdRecords[0]);
}

function readTable(table_id) {
  return knex('tables').select('*').where({ table_id }).first();
}

async function updateTableSeat(table_id, reservation_id) {
  const trx = await knex.transaction();
  let updatedTable = {};
  return trx('reservations')
    .where({ reservation_id })
    .update({ status: 'seated' }, '*')
    .then(() => {
      trx('tables')
        .where({ table_id })
        .update({ reservation_id }, '*')
        .then((results) => (updatedTable = results[0]));
    });
}

module.exports = {
  list,
  create,
};
