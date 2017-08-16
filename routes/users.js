const express = require('express');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/users_repo');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();
const userRepo = new UserRepository();

const saltRounds = 10;

function verifyLoginCredentials(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (email && password) {
    next();
    return;
  } else if (!email) {
    res.status(400).send({field: 'email', error: 'undefined'});
  } else if (!password) {
    res.status(400).send({field: 'password', error: 'undefined'});
  } else {
    res.status(400).send({field: 'unspecified', error: 'unspecified'});
  }
}

router.post('/login', verifyLoginCredentials, (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let userId;

  userRepo.getUserData(username)
    .then(userData => {
      
    })

});

module.exports = router;
