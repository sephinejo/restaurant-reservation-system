exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex
    .raw('TRUNCATE TABLE tables RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('tables').insert([
        { table_name: 'Bar #1', capacity: 1 },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' },
      ]);
    });
};
