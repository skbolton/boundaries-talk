const { Router } = require('express')
const sprintsRoutes = Router()

sprintsRoutes.route('/')
  .get(async (req, res, next) => {
    try {
      const { active = 'true' } = req.query
      const activeFilter = active === 'true' ? true : false
      const getSprintsByParams = req.scope.resolve('getSprintsByParams')
      const sprints = await getSprintsByParams({ active: activeFilter })

      return res.json({ sprints })
    } catch (e) {
      return next(e)
    }
  })
  .post(async (req, res, next) => {
    try {
      const { teamId, name } = req.body
      const createSprintAction = req.scope.resolve('createSprint')
      const sprint = await createSprintAction({ teamId, name })

      return res.status(201).json({ sprint })
    } catch (e) {
      return next(e)
    }
  })

module.exports = sprintsRoutes
