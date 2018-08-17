const { createContainer, Lifetime } = require('awilix')
// we have to require knex connection to set it up
const knex = require('./external/sql/connection')

module.exports = () => {
  const container = createContainer()

  container.loadModules([
    './app/actions/**/*.js',
    './external/*.js'
  ], {
    cwd: __dirname,
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }
  })

  return container
}
