
exports.up = function(knex) {
  return knex.schema.createTable('sprints', sprints => {
    sprints.increments()
    sprints.string('name', 30)
    sprints.boolean('active')
      .defaultTo(true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('sprints')
};
