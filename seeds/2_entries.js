
exports.seed = knex => knex('entries').del()
  .then(() => knex('entries').insert([
    {
      id: 1,
      user_id: 1,
      date: '2017-06-28',
      location: 'home',
      yoga_type: 'vinyasa',
      duration: '00:30:00',
      comments: 'What a hard workout! Focus on core',
    },
    {
      id: 2,
      user_id: 1,
      date: '2017-07-14',
      location: 'studio',
      yoga_type: 'vinyasa',
      duration: '01:30:00',
      comments: 'Satori Yoga Studio - long class working toward astavakrasana',
    },
    {
      id: 3,
      user_id: 2,
      date: '2017-07-13',
      location: 'studio',
      yoga_type: 'hatha',
      duration: '01:15:00',
      comments: 'focus on alignment and tree pose',
    },
  ]))
  .then(() => knex.raw('SELECT setval(\'entries_id_seq\', (SELECT MAX(id) FROM entries))'));
