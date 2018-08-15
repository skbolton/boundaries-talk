
exports.up = function(knex) {
  return knex.schema.createTable('issues', issues => {
    issues.increments()
    issues.string('title')
    issues.string('description')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('issues')
};
