const Sprint = require('../app/sprint/model')
const SprintSQL = require('./sql/sprint')

const create = sprint => {
  return SprintSQL.query()
    .insert(sprint)
    .then(sprint => new Sprint(sprint))
}

const findWhere = sprintParams => {
  return SprintSQL.query()
    .where(sprintParams)
    .then(sprints => sprints.map(sprint => new Sprint(sprint)))
}

module.exports = () => {
  return {
    create,
    findWhere
  }
}
