const express = require('express');
const knex = require('../knex');

class EntriesRepository {
  getAllEntries(userId) {
    return knex('entries')
      .where('user_id', userId)
  }
}
