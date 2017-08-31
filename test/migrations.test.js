process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');

suite('migrations', addDatabaseHooks(() => {
  test('users columns', (done) => {
    knex('users').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'users_id_seq\'::regclass)',
          },

          first_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying',
          },

          last_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying',
          },

          username: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null,
          },

          email: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null,
          },

          password: {
            type: 'character',
            maxLength: 60,
            nullable: false,
            defaultValue: null,
          },

          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()',
          },

          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()',
          },
        };

        Object.keys(expected).forEach((column) => {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`,
          );
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('entries columns', (done) => {
    knex('entries').columnInfo()
      .then((actual) => {
        const expected = {
          id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: 'nextval(\'entries_id_seq\'::regclass)',
          },

          user_id: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          date: {
            type: 'date',
            maxLength: null,
            nullable: false,
            defaultValue: null,
          },

          location: {
            type: 'character varying',
            maxLength: 200,
            nullable: false,
            defaultValue: '\'\'::character varying',
          },

          yoga_type: {
            type: 'character varying',
            maxLength: 200,
            nullable: false,
            defaultValue: '\'\'::character varying',
          },

          start_time: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: true,
            defaultValue: null,
          },

          end_time: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: true,
            defaultValue: null,
          },

          duration: {
            type: 'interval',
            maxLength: null,
            nullable: true,
            defaultValue: null,
          },

          comments: {
            type: 'text',
            maxLength: null,
            nullable: false,
            defaultValue: '\'\'::text',
          },
        };

        Object.keys(expected).forEach((column) => {
          assert.deepEqual(
            actual[column],
            expected[column],
            `Column ${column} is not the same`,
          );
        });

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
