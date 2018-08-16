
exports.up = function(knex) {
  return knex.schema.createTable('issues', issues => {
    issues.increments()
    issues.string('title')
    issues.string('description')
    issues.boolean('active')
      .defaultTo(true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('issues')
};
