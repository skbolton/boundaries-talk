
exports.up = function(knex) {
  return knex.schema.createTable('teams', teams => {
    teams.increments()
    teams.string('name', 30)

    teams.unique('name')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('teams')
};
