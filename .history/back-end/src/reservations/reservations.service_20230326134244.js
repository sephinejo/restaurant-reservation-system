const knex = require('../db/connection');

function list(date) {
  return knex('reservations')
    .select('*')
    .where({ reservation_date: date })
    .orderBy('reservation_time');
}

function create(newReservation) {
  return knex('reservations').select('*');
}

module.exports = {
  list,
};
