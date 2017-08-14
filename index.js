const express = require('express');
const app = express();
const knex = require('./knex');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    /* eslint-disable no-console */
    console.log('Listening on port', port);
  }
});

module.exports = app;
