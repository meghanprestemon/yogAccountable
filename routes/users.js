const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/users_repo');
const { decamelizeKeys } = require('humps');

const router = express.Router();
const userRepo = new UserRepository();

function verifyLoginCredentials(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    next();
    return;
  } else if (!username) {
    res.status(400).send({field: 'username', error: 'undefined'});
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
      if(!userData) {
        throw new Error('UNSUCCESSFUL_LOGIN');
      }
      userId = userData.id;
      return bcrypt.compare(password, userData.password);
    })
    .then(success => {
      if (!success) {
        throw new Error('UNSUCCESSFUL_LOGIN');
      }
      const jwtPayload = {
        iss: 'yogAccountable',
        sub: {
          id: userId
        },
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
      };
      const token = jwt.sign(jwtPayload, process.env.JWT_KEY);
      res.cookie('token', token, {httpOnly: true}).status(200).send(true)
    })
    .catch(err => {
      if (err.message === 'UNSUCCESSFUL_LOGIN') {
        res.status(400).send({field: 'login', error: 'not found'});
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(err);
    });
});

router.post('/register', (req, res) => {
  userRepo.verifyUniqueEmail(req.body.email)
    .then(userData => {
      if (userData) {
        throw new Error('EMAIL_ALREADY_EXISTS')
      }
      return userRepo.verifyUniqueUsername(req.body.username)
    })
    .then(userData => {
      if (userData) {
        throw new Error('USERNAME_ALREADY_EXISTS')
      }
      return bcrypt.hash(req.body.password, 12)
    })
    .then(password => {
      return userRepo.registerUser(decamelizeKeys(req.body), password);
    })
    .then(newUserId => {
      res.status(200).send({register: true, newUser: newUserId[0]})
    })
    .catch(err => {
      if (err.message === 'EMAIL_ALREADY_EXISTS') {
        res.status(400).send({field: 'register', error: 'email already exists'});
        return;
      } else if (err.message === 'USERNAME_ALREADY_EXISTS') {
        res.status(400).send({field: 'register', error: 'username already exists'});
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(err);
    });
});

module.exports = router;
