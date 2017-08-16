const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const entries = require('./routes/entries');
const users = require('./routes/users');

app.use('/entries', entries);
app.use('/users', users);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    /* eslint-disable no-console */
    console.log('Listening on port', port);
  }
});

module.exports = app;
