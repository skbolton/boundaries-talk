
exports.up = function(knex) {
  return knex.schema.table('users', users => {
    users.integer('team_id')
      .references('teams.id')
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.table('users', users => {
    users.dropForeign('team_id')
  })
};
