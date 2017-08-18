
exports.seed = knex => knex('users').del()
  .then(() => knex('users').insert([
    {
      id: 1,
      first_name: 'Meghan',
      last_name: 'Prestemon',
      username: 'meghanprestemon',
      email: 'm.m.hares@gmail.com',
      password: '$2a$12$Y1eSbQB7lbT7yypSZKebGOv29SQ8u6gsNkVLSBkAgu1CUVf8mY16O', // youreawizard
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    },
    {
      id: 2,
      first_name: 'Carl',
      last_name: 'Jung',
      username: 'carljung',
      email: 'carljung@psych.com',
      password: '$2a$12$Y1eSbQB7lbT7yypSZKebGOv29SQ8u6gsNkVLSBkAgu1CUVf8mY16O', // youreawizard
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    },
    {
      id: 3,
      first_name: 'Pattabhi',
      last_name: 'Jois',
      username: 'skpjois',
      email: 'skpjois@yogi.com',
      password: '$2a$12$Y1eSbQB7lbT7yypSZKebGOv29SQ8u6gsNkVLSBkAgu1CUVf8mY16O', // youreawizard
      created_at: new Date('2016-06-29 14:26:16 UTC'),
      updated_at: new Date('2016-06-29 14:26:16 UTC'),
    },
  ]))
  .then(() => knex.raw('SELECT setval(\'users_id_seq\', (SELECT MAX(id) FROM users))'));
