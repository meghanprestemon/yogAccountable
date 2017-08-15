
exports.up = function(knex) {
  return knex.schema.createTable('entries', (table) => {
    table.increments('id').primary();
    table.integer('user_id')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .index();
    table.date('date').notNullable();
    table.string('location', 200).notNullable();
    table.string('yoga_type', 200).notNullable();
    table.specificType('duration', 'interval').notNullable();
    table.text('comments').notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('entries');
};
