const { Router } = require('express')
const teamsRoutes = Router()

teamsRoutes.route('/')
  .post(async (req, res, next) => {
    try {
      const { name } = req.body
      const createTeamAction = req.scope.resolve('createTeam')
      const team = await createTeamAction({ name })

      return res.status(201).json({ team })
    } catch (e) {
      return next(e)
    }
  })
  .get(async (req, res, next) => {
    try {
      const getAllTeamsAction = req.scope.resolve('getAllTeams')

      const teams = await getAllTeamsAction()

      return res.json({ teams })
    } catch (e) {
      return next(e)
    }
  })

module.exports = teamsRoutes
