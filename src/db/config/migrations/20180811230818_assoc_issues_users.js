
exports.up = function(knex) {
  return knex.schema.table('issues', issues => {
    issues.integer('owner_id')
      .references('users.id')
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.table('issues', issues => {
    issues.dropForeign([ 'owner_id' ])
  })
};
