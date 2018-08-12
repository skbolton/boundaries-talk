
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments()
    users.string('first_name')
    users.string('last_name')
    users.timestamps()
    users.unique([ 'first_name', 'last_name' ])
  })
};

exports.down = function(knex) {
   return knex.schema.dropTable('users')
};
