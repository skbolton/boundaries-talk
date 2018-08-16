const Sprint = require('../db/sprint')

const findWhere = params => {
  return Sprint.query()
    .where(params)
    .execute()
}

const create = sprintData => {
  return Sprint.query()
    .insert(sprintData)
    .execute()
}

module.exports = {
  findWhere,
  create
}
