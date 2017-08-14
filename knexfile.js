module.exports = {

  test: {
    client: 'postgresql',
    connection: {
      database: 'yogaccountable_test',
      user: 'postgres',
      host: 'postgres',
    },
  },

  dev: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user: 'yogaccountable',
      password: 'yoga',
      host: 'postgres',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },

}
