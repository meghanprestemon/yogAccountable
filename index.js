if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
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
    /* eslint-disable no-console */
    console.log('Listening on port', port);
  }
});

module.exports = app;
