
exports.up = knex =>
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name', 255).notNullable().defaultTo('');
    table.string('last_name', 255).notNullable().defaultTo('');
    table.string('username', 255).notNullable().unique();
    table.string('email', 255).notNullable().unique();
    table.specificType('password', 'char(60)').notNullable();
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable('users');
