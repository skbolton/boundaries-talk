const Issue = require('../db/issue')

const create = issueData => {
  return Issue.query()
    .insert(issueData)
    .execute()
}

const findWhere = params => {
  return Issue.query()
    .where(params)
    .execute()
}

module.exports = {
  create,
  findWhere
}
