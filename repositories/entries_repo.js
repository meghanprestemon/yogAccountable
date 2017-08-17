const express = require('express');
const knex = require('../knex');

class EntriesRepository {
  getAllEntries(userId) {
    return knex('entries')
      .where('user_id', userId)
  }

  createEntry(user_id, entryData) {
    return knex('entries')
      insert({
        user_id,
        date: entryData.date,
        location: entryData.location,
        yoga_type: entryData.yoga_type,
        start_time: entryData.start_time,
        end_time: entryData.end_time,
        duration: entryData.duration,
        comments: entryData.comments
      }, '*')
  }
}
