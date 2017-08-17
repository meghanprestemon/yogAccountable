const express = require('express');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/users_repo');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();
const userRepo = new UserRepository();

const saltRounds = 10;

//NOTE do i need this? don't the first 2 steps of the /login route take care of this?
        // i.e. !userData and !success

// function verifyLoginCredentials(req, res) {
//   let username = req.body.username;
//   let password = req.body.password;
//
//   if (email && password) {
//     next();
//     return;
//   } else if (!email) {
//     res.status(400).send({field: 'email', error: 'undefined'});
//   } else if (!password) {
//     res.status(400).send({field: 'password', error: 'undefined'});
//   } else {
//     res.status(400).send({field: 'unspecified', error: 'unspecified'});
//   }
// }

router.post('/login', verifyLoginCredentials, (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let userId;

  userRepo.getUserData(username)
    .then(userData => {
      if(!userData) {
        res.header('Content-Type', 'text/plain');
        return res.status(400).send({field: 'login', error: 'not found'});
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
        }
      };
      const token = jwt.sign(jwtPayload, process.env.JWT_KEY);
      res.cookie('token', token, {httpOnly: true}).status(200).send({login: 'success'})
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

module.exports = router;
