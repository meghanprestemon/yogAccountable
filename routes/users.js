const express = require('express');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/users_repo');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();
const userRepo = new UserRepository();

const saltRounds = 10;
