const knex = require('../knex');

class UserRepository {
  getUserData(username) {
    return knex('users')
      .where({ username })
      .first();
  }

  verifyUniqueEmail(email) {
    return knex('users')
      .where({ email })
      .first();
  }

  verifyUniqueUsername(username) {
    return knex('users')
      .where({ username })
      .first();
  }

  registerUser(body, password) {
    return knex('users')
      .insert({
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        email: body.email,
        password
      }, 'id');
  }
}

module.exports = UserRepository;
