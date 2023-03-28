exports.up = function (knex) {
  return knex.schema.createTable('tables', (table) => {
    table.increments('table_id').primary();
    table.string('table_name').unique().notNullable();
    table.integer('capacity').unsigned().notNullable();
    table.integer('reservation_id').unsigned();
    table
      .foreign('reservation_id')
      .references('reservation_id')
      .inTable('reservations');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {};
