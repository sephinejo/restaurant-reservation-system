const knex = require('../db/connection');

function list(reservation_date) {
  return knex('reservations').select('*').where({}).orderBy('reservation_time');
}

module.exports = {
  list,
};
