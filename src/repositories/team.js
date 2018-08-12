const Team = require('../db/team')

const create = teamData => {
  return Team.query()
    .insert(teamData)
    .execute()
}

const findById = id => {
  return Team.query()
    .findById(id)
    .context({ id })
    .throwIfNotFound()
    .execute()
}

const findAll = () => {
  return Team.query()
    .execute()
}

module.exports = {
  create,
  findAll,
  findById
}
