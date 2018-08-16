const IssueSQL = require('./sql/issue')
const Issue = require('../app/issue/model')

const create = issue => {
  return IssueSQL.query()
    .insert(issue)
    .then(issue => new Issue(issue))
}

const fetchAll = () => {
  return IssueSQL.query()
    .then(results =>
      results.map(result => new Issue(result))
    )
}

const findWhere = params => {
  return IssueSQL.query()
    .where(params)
    .then(issues => issues.map(issue => new Issue(issue)))
}

module.exports = () => {
  return {
    create,
    fetchAll,
    findWhere
  }
}
