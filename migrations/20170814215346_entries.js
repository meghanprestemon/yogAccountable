
exports.up = function(knex) {
  return knex.schema.createTable('entries', (table) => {
    table.increments('id').primary();
    table.date('date').notNullable();
    table.string('location', 200).notNullable();
    table.string('yoga_type', 200).notNullable();
    table.string('duration', 200).notNullable();
    table.text('comments').notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('entries');
};
