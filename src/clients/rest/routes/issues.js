const { Router } = require('express')
const issuesRoutes = Router()

issuesRoutes.route('/')
  .get(async (req, res, next) => {
    try {
      const { active = 'true' } = req.query
      const activeFilter = active === 'true'
      const getIssuesByParams = req.scope.resolve('getIssuesByParams')

      const issues = await getIssuesByParams({ active: activeFilter })

      return res.json({ issues })
    } catch (e) {
      return next(e)
    }
  })
  .post(async (req, res, next) => {
    try {
      const { title, description, createdBy } = req.body
      const createIssueAction = req.scope.resolve('createIssue')
      const createdIssue = await createIssueAction({ title, description, createdBy })

      return res.status(201).send({ issue: createdIssue })
    } catch (e) {
      return next(e)
    }
  })

module.exports = issuesRoutes
