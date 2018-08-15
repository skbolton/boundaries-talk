
exports.up = function(knex) {
  return knex.schema.table('issues', issues => {
    issues.integer('created_by')
      .references('users.id')
      .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.table('issues', issues => {
    issues.dropForeign([ 'created_by' ])
  })
};
