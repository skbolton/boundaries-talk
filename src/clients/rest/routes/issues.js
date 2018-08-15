const { Router } = require('express')
const issuesRoutes = Router()

issuesRoutes.post('/', async (req, res, next) => {
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
