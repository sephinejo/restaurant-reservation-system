const knex = require('../db/connection');

function list(date) {
  return knex('reservations')
    .select('*')
    .where({ reservation_date: date })
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

module.exports = {
  list,
  create,
  update,
  read,
};
