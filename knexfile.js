module.exports = {

  test: {
    client: 'postgresql',
    connection: {
      database: 'yogaccountable_test',
      user: 'yogaccountable',
      password: 'yoga',
      host: 'postgres_test',
    },
  },

  dev: {
    client: 'postgresql',
    connection: {
      database: 'yogaccountable',
      user: 'yogaccountable',
      password: 'yoga',
      host: 'postgres',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },

};
