
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert([
        {
          name: 'Superman',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          name: 'Hulk',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          name: 'Black Widow',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    });
};
