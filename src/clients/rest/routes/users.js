const { Router } = require('express')
const usersRepo = require('../repositories/user')
const teamsRepo = require('../repositories/team')

const usersRoutes = Router()

usersRoutes.route('/')
  .get(async (_req, res, next) => {
    try {
      const users = await usersRepo.findAll()
      return res.json({ users })
    } catch (e) {
      return next(e)
    }
  })
  .post(async (req, res, next) => {
    try {
      const { firstName, lastName, teamId } = req.body
      // verify that teamId is a valid team
      await teamsRepo.findById(teamId)
      const user = await usersRepo.create({ firstName, lastName, teamId })

      return res.status(201).json({ user })
    } catch (e) {
      return next(e)
    }
  })

usersRoutes.post('/:userId/teams/:teamId', async (req, res, next) => {
  try {
    const { userId, teamId } = req.params
    const _userId = parseInt(userId)
    const _teamId = parseInt(teamId)
    const [ user, team ] = await Promise.all([
      usersRepo.findById(_userId),
      teamsRepo.findById(_teamId)
    ])
    const updatedUser = await usersRepo.update(userId, { teamId: _teamId })

    return res.json({ user: updatedUser })

  } catch (e) {
    return next(e)
  }
})

module.exports = usersRoutes
