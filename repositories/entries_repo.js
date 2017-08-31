const knex = require('../knex');

class EntriesRepository {
  static getAllEntries(userId) {
    return knex('entries')
      .where({ user_id: userId })
      .orderBy('date', 'ASC');
  }

  static createEntry(userId, entryData) {
    return knex('entries')
      .insert({
        user_id: userId,
        date: new Date(entryData.date),
        location: entryData.location,
        yoga_type: entryData.yoga_type,
        start_time: new Date(`${entryData.date}T${entryData.start_time}`),
        end_time: new Date(`${entryData.date}T${entryData.end_time}`),
        duration: entryData.duration,
        comments: entryData.comments,
      }, '*');
  }

  static updateEntry(id, userId, entryData) {
    return knex('entries')
      .where({ id, user_id: userId })
      .update(entryData, '*');
  }

  static deleteEntry(id, userId) {
    return knex('entries')
      .where({ id, user_id: userId })
      .del()
      .returning('id');
  }
}

module.exports = EntriesRepository;
