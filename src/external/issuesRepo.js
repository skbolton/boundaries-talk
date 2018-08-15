const IssueSQL = require('./sql/issue')
const IssueModel = require('../app/issue/model')

const create = issue => {
  return IssueSQL.query()
    .insert(issue)
    .execute()
    .then(issue => new IssueModel(issue))
}

const fetchAll = () => {
  return IssueSQL.query()
    .then(results =>
      results.map(result => new IssueModel(result))
    )
}

module.exports = () => {
  return {
    create,
    fetchAll
  }
}
