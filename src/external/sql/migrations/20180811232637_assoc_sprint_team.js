
exports.up = function(knex) {
  return knex.schema.table('sprints', sprints => {
    sprints.integer('team_id')
      .references('teams.id')
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.table('sprints', sprints => {
    sprints.dropForeign('team_id')
  })
};
