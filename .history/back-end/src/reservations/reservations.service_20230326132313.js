const knex = require('../db/connection');

// function list(reservation_date) {
//   return knex('reservations')
//     .select('*')
//     .where({ reservation_date: reservation_date })
//     .orderBy('reservation_time');
// }

function list() {
  return knex('reservations').select('*').orderBy('reservation_time');
}

module.exports = {
  list,
};
