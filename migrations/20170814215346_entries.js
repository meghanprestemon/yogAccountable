
exports.up = function(knex) {
  return knex.schema.createTable('entries', (table) => {
    table.increments('id').primary();
    table.integer('user_id')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .index();
    table.date('date').notNullable();
    table.string('location', 200).notNullable().defaultTo('');
    table.string('yoga_type', 200).notNullable().defaultTo('');
    table.time('start_time');
    table.time('end_time');
    table.specificType('duration', 'interval');
    table.text('comments').notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('entries');
};
