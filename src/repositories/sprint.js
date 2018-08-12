const Sprint = require('../db/sprint')

const findAll = () => {
  return Sprint.query()
    .execute()
}

const create = sprintData => {
  return Sprint.query()
    .insert(sprintData)
    .execute()
}

const findActiveSprintForTeam = teamId => {
  return Sprint.query()
    .findOne({ active: true, teamId })
    .execute()
}

module.exports = {
  findActiveSprintForTeam,
  findAll,
  create
}
