
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert([
        {
          name: 'Archimedes',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          name: 'Apollo',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          name: 'Newton',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    });
};
