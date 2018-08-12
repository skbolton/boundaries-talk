// this file just has to be required to set up connection and orm
module.exports = () => {
  const knex = require('./config/connection')
  return Promise.resolve(knex)
}
