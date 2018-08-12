const Knex = require('knex')
const knexConfig = require('./knexfile')
const { Model, knexSnakeCaseMappers } = require('objection')

const configForEnv = knexConfig[process.env.NODE_ENV || 'development']
const config = Object.assign({}, configForEnv, knexSnakeCaseMappers())
const knex = Knex(config)

Model.knex(knex)

module.exports = knex
