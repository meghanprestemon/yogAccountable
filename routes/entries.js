const express = require('express');
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const EntriesRepository = require('../repositories/entries_repo');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();
const entriesRepo = new EntriesRepository();

function verifyToken(req, res, next){
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, decoded) => {
    if(decoded){
      next();
      return;
    }
    res.status(401).send({field: 'token', error: 'unauthorized'});
  });
}

function getUserId(req) {
  let decodedToken = jwt.decode(req.cookies.token, {complete: true});
  return decodedToken.payload.sub.id;
}

router.get('/', verifyToken, (req, res) => {
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

router.post('/', verifyToken, (req, res) => {
  let userId = getUserId(req);
  if (!userId) {
    return res.status(401).send({field: 'userId', error: 'unauthorized'});
  }

  entriesRepo.createEntry(userId, decamelizeKeys(req.body))
    .then(entry => {
      res.status(200).send(camelizeKeys(entry[0]));
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(err);
    });
});

router.post('/:id', verifyToken, (req, res) => {
  let userId = getUserId(req);
  if (!userId) {
    return res.status(401).send({field: 'userId', error: 'unauthorized'})
  }

  entriesRepo.updateEntry(req.params.id, userId, decamelizeKeys(req.body))
    .then(entry => {
      res.status(200).send(camelizeKeys(entry[0]))
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(err);
    });
});

router.delete('/:id', verifyToken, (req, res) => {
  let userId = getUserId(req);
  if (!userId) {
    return res.status(401).send({field: 'userId', error: 'unauthorized'});
  }

  entriesRepo.deleteEntry(req.params.id, userId)
    .then(id => {
      res.status(200).send({action: 'deleted', id: id[0]});
    })
    .catch(err => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send(err);
    });
});

module.exports = router;
