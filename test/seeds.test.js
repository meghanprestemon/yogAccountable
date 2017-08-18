const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const parse = require('postgres-interval');
const { addDatabaseHooks } = require('./utils');

suite('seeds', addDatabaseHooks(() => {
  test('users rows', (done) => {
    knex('users').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [
          {
            id: 1,
            first_name: 'Meghan',
            last_name: 'Prestemon',
            username: 'meghanprestemon',
            email: 'm.m.hares@gmail.com',
            password: '$2a$12$Y1eSbQB7lbT7yypSZKebGOv29SQ8u6gsNkVLSBkAgu1CUVf8mY16O', // youreawizard
            created_at: new Date('2016-06-29 14:26:16 UTC'),
            updated_at: new Date('2016-06-29 14:26:16 UTC'),
          },
          {
            id: 2,
            first_name: 'Carl',
            last_name: 'Jung',
            username: 'carljung',
            email: 'carljung@psych.com',
            password: '$2a$12$Y1eSbQB7lbT7yypSZKebGOv29SQ8u6gsNkVLSBkAgu1CUVf8mY16O', // youreawizard
            created_at: new Date('2016-06-29 14:26:16 UTC'),
            updated_at: new Date('2016-06-29 14:26:16 UTC'),
          },
          {
            id: 3,
            first_name: 'Pattabhi',
            last_name: 'Jois',
            username: 'skpjois',
            email: 'skpjois@yogi.com',
            password: '$2a$12$Y1eSbQB7lbT7yypSZKebGOv29SQ8u6gsNkVLSBkAgu1CUVf8mY16O', // youreawizard
            created_at: new Date('2016-06-29 14:26:16 UTC'),
            updated_at: new Date('2016-06-29 14:26:16 UTC'),
          },
        ];

        expected.forEach((row, i) => {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`,
          );
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('entries rows', (done) => {
    knex('entries').orderBy('id', 'ASC')
      .then((actual) => {
        const expected = [
          {
            id: 1,
            user_id: 1,
            date: new Date('2017-06-28'),
            location: 'home',
            yoga_type: 'vinyasa',
            start_time: '13:00:00',
            end_time: '13:30:00',
            duration: parse('00:30:00'),
            comments: 'What a hard workout! Focus on core',
          },
          {
            id: 2,
            user_id: 1,
            date: new Date('2017-07-14'),
            location: 'studio',
            yoga_type: 'vinyasa',
            start_time: '12:00:00',
            end_time: '13:30:00',
            duration: parse('01:30:00'),
            comments: 'Satori Yoga Studio - long class working toward astavakrasana',
          },
          {
            id: 3,
            user_id: 2,
            date: new Date('2017-07-13'),
            location: 'studio',
            yoga_type: 'hatha',
            start_time: '12:00:00',
            end_time: '13:15:00',
            duration: parse('01:15:00'),
            comments: 'focus on alignment and tree pose',
          },
        ];

        expected.forEach((row, i) => {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`,
          );
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
