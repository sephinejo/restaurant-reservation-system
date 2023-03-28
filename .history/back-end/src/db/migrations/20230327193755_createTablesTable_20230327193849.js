exports.up = function (knex) {
  return knex.schema.createTable('tables', (table) => {
    table.increments('table_id').primary();
    table.string('table_name');
  });
};

exports.down = function (knex) {};
