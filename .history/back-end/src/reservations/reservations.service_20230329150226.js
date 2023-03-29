const knex = require('../db/connection');

function list(reservation_date) {
  return knex('reservations')
    .select('*')
    .where({ reservation_date })
    .whereNot({ status: 'finished' })
    .orderBy('reservation_time');
}

function create(newReservation) {
  return knex('reservations')
    .insert(newReservation, '*')
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedReservation) {
  return knex('reservations')
    .select('*')
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, '*')
    .then((updatedRecords) => updatedRecords[0]);
}

function read(reservation_id) {
  return knex('reservations').select('*').where({ reservation_id }).first();
}

function search(mobile_number) {
  return knex('reservations')
    .select('*')
    .whereRaw(
      "translate(mobile_number', '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, '')}%`
    )
    .orderBy('reservation_date');
}

module.exports = {
  list,
  create,
  update,
  read,
};
