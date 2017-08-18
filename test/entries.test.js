process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils')

suite('entries routes', addDatabaseHooks(() => {
  suite('with token', addDatabaseHooks(() => {
    const agent = request.agent(server);
    let cookie;

    beforeEach((done) => {
      request(server)
        .post('/users/login')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          username: 'meghanprestemon',
          password: 'youreawizard'
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          cookie = res.headers['set-cookie'];
          done();
        });
    });

    test('GET /entries', (done) => {
      agent
        .get('/entries')
        .set('Cookie', cookie)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [
          {
            id: 1,
            userId: 1,
            date: '2017-06-28T00:00:00.000Z',
            location: 'home',
            yogaType: 'vinyasa',
            startTime: '13:00:00',
            endTime: '13:30:00',
            duration: {
              'minutes': 30
            },
            comments: 'What a hard workout! Focus on core',
          },
          {
            id: 2,
            userId: 1,
            date: '2017-07-14T00:00:00.000Z',
            location: 'studio',
            yogaType: 'vinyasa',
            startTime: '12:00:00',
            endTime: '13:30:00',
            duration: {
              'hours': 1,
              'minutes': 30
            },
            comments: 'Satori Yoga Studio - long class working toward astavakrasana',
          }
        ], done);

    });

    test('POST /entries', (done) => {
      agent
        .post('/entries')
        .set('Cookie', cookie)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          date: '2017-08-14',
          location: 'home',
          yogaType: 'ashtanga',
          startTime: '13:00:00',
          endTime: '14:30:00',
          duration: '01:30:00',
          comments: 'Focus on bhujapidasana',
        })
        .expect('Content-Type', /json/)
        .expect((res) => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(200, {
          id: 4,
          userId: 1,
          date: '2017-08-14T00:00:00.000Z',
          location: 'home',
          yogaType: 'ashtanga',
          startTime: '13:00:00',
          endTime: '14:30:00',
          duration: {
            'hours': 1,
            'minutes': 30
          },
          comments: 'Focus on bhujapidasana',
        }, done);
    });

    test('POST /entries/:id', (done) => {
      request(server)
        .post('/entries/1')
        .set('Cookie', cookie)
        .set('Accept', 'application/json')
        .send({
          yogaType: 'hatha',
          comments: 'stretching and alignment',
        })
        .expect('Content-Type', /json/)
        .expect((res) => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(200, {
            id: 1,
            userId: 1,
            date: '2017-06-28T00:00:00.000Z',
            location: 'home',
            yogaType: 'hatha',
            startTime: '13:00:00',
            endTime: '13:30:00',
            duration: {
              'minutes': 30
            },
            comments: 'stretching and alignment',
        }, done);
    });

    test('DELETE /entries/:id', (done) => {
      agent
        .delete('/entries/2')
        .set('Cookie', cookie)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect((res) => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(200, {action: 'deleted', id: 2}, done);
    });
  }));

  suite('without token', addDatabaseHooks(() => {
    test('GET /entries', (done) => {
      request(server)
        .get('/entries')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401, {field: 'token', error: 'unauthorized'}, done);
    });

    test('POST /entries', (done) => {
      request(server)
        .post('/entries')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          date: '2017-08-13',
          location: 'home',
          yogaType: 'vinyasa',
          startTime: '13:00:00',
          endTime: '14:30:00',
          duration: '01:30:00',
          comments: 'more stretching',
        })
        .expect('Content-Type', /json/)
        .expect(401, {field: 'token', error: 'unauthorized'}, done);
    });

    test('POST /entries/:id', (done) => {
      request(server)
        .post('/entries/1')
        .set('Accept', 'application/json')
        .send({
          yogaType: 'ashtanga',
          comments: 'primary series',
        })
        .expect('Content-Type', /json/)
        .expect(401, {field: 'token', error: 'unauthorized'}, done);
    });

    test('DELETE /entries/:id', (done) => {
      request(server)
        .del('/entries/:id')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ entryId: 1 })
        .expect('Content-Type', /json/)
        .expect(401, {field: 'token', error: 'unauthorized'}, done);
    });
  }));
}));
