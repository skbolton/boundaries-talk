const Team = require('../app/team/model')
const TeamSQL = require('./sql/team')

const create = team => {
  return TeamSQL.query()
    .insert(team)
    .then(team => new Team(team))
}

const findById = id => {
  return TeamSQL.query()
    .findById(id)
    .then(team => new Team(team))
}

const findAll = () => {
  return TeamSQL.query()
    .then(teams =>
      teams.map(team => new Team(team))
    )
}

module.exports = () => {
  return {
    create,
    findById,
    findAll
  }
}
