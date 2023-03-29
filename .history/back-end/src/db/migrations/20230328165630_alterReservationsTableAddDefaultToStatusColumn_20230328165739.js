const { table } = require('../connection');

exports.up = function (knex) {
  return knex.schema.alterTable('reservations', (table) => {
    table.string('status').defaultTo('booked').alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('reservations', (table) => {
    table.string('status').alter();
  });
};
