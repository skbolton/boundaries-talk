const { Router } = require('express')
const sprintsRepo = require('../repositories/sprint')
const teamsRepo = require('../repositories/team')

const sprintsRoutes = Router()

sprintsRoutes.route('/')
  .post(async (req, res, next) => {
    try {
      const { teamId, name } = req.body
      // verify team exists
      const team = await teamsRepo.findById(teamId)
      // verify that team doesn't have an active sprint already
      const activeSprint = await sprintsRepo.findActiveSprintForTeam(teamId)
      if (activeSprint) {
        const error = new Error(`Team ${teamId} already has an active sprint`)
        error.status = 400
        return next(error)
      }
      const sprint = await sprintsRepo.create({ name, teamId })

      return res.status(201).json({ sprint })
    } catch (e) {
      return next(e)
    }
  })
  .get(async (_req, res, next) => {
    try {
      const sprints = await sprintsRepo.findAll()

      return res.json({ sprints })
    } catch (e) {
      return next(e)
    }
  })

module.exports = sprintsRoutes
