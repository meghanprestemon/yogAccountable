
exports.seed = knex => knex('entries').del()
  .then(() => knex('entries').insert([
    {
      id: 1,
      user_id: 1,
      date: '2017-06-28',
      location: 'home',
      yoga_type: 'vinyasa',
      start_time: '13:00:00',
      end_time: '13:30:00',
      duration: '00:30:00',
      comments: 'What a hard workout! Focus on core',
    },
    {
      id: 2,
      user_id: 1,
      date: '2017-07-14',
      location: 'studio',
      yoga_type: 'vinyasa',
      start_time: '12:00:00',
      end_time: '13:30:00',
      duration: '01:30:00',
      comments: 'Satori Yoga Studio - long class working toward astavakrasana',
    },
    {
      id: 3,
      user_id: 2,
      date: '2017-07-13',
      location: 'studio',
      yoga_type: 'hatha',
      start_time: '12:00:00',
      end_time: '13:15:00',
      duration: '01:15:00',
      comments: 'focus on alignment and tree pose',
    },
  ]))
  .then(() => knex.raw('SELECT setval(\'entries_id_seq\', (SELECT MAX(id) FROM entries))'));
