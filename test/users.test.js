/* eslint-disable no-param-reassign, consistent-return */

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const bcrypt = require('bcrypt');
const request = require('supertest');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils');

suite('users routes', addDatabaseHooks(() => {
  suite('login route', addDatabaseHooks(() => {
    test('POST /login as authorized user', (done) => {
      request(server)
        .post('/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          username: 'meghanprestemon',
          password: 'youreawizard',
        })
        .expect('Set-Cookie', /token=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\//)
        .expect((res) =>{
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(200, {
          login: true,
          userFirstName: 'Meghan',
          userId: 1
        })
        .expect('Content-Type', /json/)
        .end(done);
    });

    test('POST /login with no username', (done) => {
      request(server)
        .post('/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          password: 'youreawizard',
        })
        .expect(400, { field: 'username', error: 'undefined' })
        .expect('Content-Type', /json/)
        .end(done);
    });

    test('POST /login with no password', (done) => {
      request(server)
        .post('/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          username: 'meghanprestemon',
        })
        .expect(400, { field: 'password', error: 'undefined' })
        .expect('Content-Type', /json/)
        .end(done);
    });

    test('POST /login with incorrect username', (done) => {
      request(server)
        .post('/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          username: 'notARealUsername',
          password: 'youreawizard',
        })
        .expect(400, { field: 'login', error: 'not found' })
        .expect('Content-Type', /json/)
        .end(done);
    });

    test('POST /login with incorrect password', (done) => {
      request(server)
        .post('/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          username: 'meghanprestemon',
          password: 'badpassword',
        })
        .expect(400, { field: 'login', error: 'not found' })
        .expect('Content-Type', /json/)
        .end(done);
    });
  }));

  suite('register route', addDatabaseHooks(() => {
    const password = 'newPerson';
    test('POST /register with proper credentials', (done) => {
      request(server)
        .post('/users/register')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          firstName: 'Person',
          lastName: 'McTest',
          username: 'pMcTest',
          email: 'person@gmail.com',
          password,
        })
        .expect((res) => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(200, { register: true, newUser: 4 })
        .expect('Content-Type', /json/)
        .end((httpErr) => {
          if (httpErr) {
            return done(httpErr);
          }

          knex('users')
            .where('id', 4)
            .first()
            .then((user) => {
              const hashedPassword = user.password;

              delete user.password;
              delete user.created_at;
              delete user.updated_at;

              assert.deepEqual(user, {
                id: 4,
                first_name: 'Person',
                last_name: 'McTest',
                username: 'pMcTest',
                email: 'person@gmail.com',
              });

              const isMatch = bcrypt.compareSync(password, hashedPassword);

              assert.isTrue(isMatch, "passwords don't match");
              done();
            })
            .catch((dbErr) => {
              done(dbErr);
            });
        });
    });

    test('POST /register with existing email', (done) => {
      knex('users')
        .insert({
          first_name: 'Person',
          last_name: 'McTest',
          username: 'McTestPerson',
          email: 'person@gmail.com',
          password: bcrypt.hashSync(password, 1),
        })
        .then(() => {
          request(server)
            .post('/users/register')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
              firstName: 'Person',
              lastName: 'McTest',
              username: 'McTestPerson',
              email: 'person@gmail.com',
              password,
            })
            .expect(400, { field: 'register', error: 'email already exists' })
            .expect('Content-Type', /json/)
            .end(done);
        })
        .catch((err) => {
          done(err);
        });
    });

    test('POST /register with existing username', (done) => {
      knex('users')
        .insert({
          first_name: 'Person',
          last_name: 'McTest',
          username: 'pMcTest',
          email: 'personMcTest@gmail.com',
          password: bcrypt.hashSync(password, 1),
        })
        .then(() => {
          request(server)
            .post('/users/register')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
              firstName: 'Person',
              lastName: 'McTest',
              username: 'pMcTest',
              email: 'newPerson@gmail.com',
              password,
            })
            .expect(400, { field: 'register', error: 'username already exists' })
            .expect('Content-Type', /json/)
            .end(done);
        })
        .catch((err) => {
          done(err);
        });
    });
  }));
}));
