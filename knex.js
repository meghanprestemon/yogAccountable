const knex = require('knex');

const environment = process.env.NODE_ENV || 'dev';
const config = require('./knexfile')[environment];

module.exports = knex(config);
