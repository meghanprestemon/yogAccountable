if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.disable('x-powered-by');

const entries = require('./routes/entries');
const users = require('./routes/users');

app.use('/entries', entries);
app.use('/users', users);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
