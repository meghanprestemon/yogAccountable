const express = require('express');
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const EntriesRepository = require('../repositories/entries_repo');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();
const entriesRepo = new EntriesRepository();

function checkForToken(req, res, next){
  if(req.cookies.token){
    next();
    return;
  }
  res.status(401).send({field: 'token', error: 'unauthorized'});
}

//NOTE what does this do?? Find out and update send content
function verifyUser(req, res, next){
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, decoded) => {
    if(decoded){
      next();
      return;
    }
    res.status(401).send('Unauthorized');
  });
}

function getUserId(req) {
  let decodedToken = jwt.decode(req.cookies.token, {complete: true});
  return decodedToken.payload.sub.id;
  //NOTE maybe just  `decodedToken.sub.id`
}

router.get('/', checkForToken, verifyUser, (req, res) => {
  let userId = getUserId(req);
  if (!userId) {
    return res.status(401).send({field: 'userId', error: 'unauthorized'});
  }

  entriesRepo.getAllEntries(userId)
    .then(entryData => {
      res.status(200).send(camelizeKeys(entryData));
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(err);
    });
});

router.post('/', checkForToken, verifyUser, (req, res) => {
  let userId = getUserId(req);
  if (!userId) {
    return res.status(401).send('Unauthorized')
  }

  entriesRepo.createEntry(userId, decamelizeKeys(req.body))
    .then(entries => {
      res.status(200).send(camelizeKeys(entries[0]))
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(err);
    });
});



module.exports = router;
