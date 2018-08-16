
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'Juniper',
          last_name: 'Reese', team_id: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          first_name: 'Walter',
          last_name: 'Shuman',
          team_id: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          first_name: 'John',
          last_name: 'Daker',
          team_id: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    });
};
