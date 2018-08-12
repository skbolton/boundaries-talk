const Issue = require('../db/issue')

const create = issueData => {
  return Issue.query()
    .insert(issueData)
    .execute()
}

const findAll = () => {
  return Issue.query()
    .execute()
}

module.exports = {
  create,
  findAll
}
