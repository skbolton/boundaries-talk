const { Router } = require('express')
const usersRepo = require('../repositories/user')
const issuesRepo = require('../repositories/issue')

const issuesRoutes = Router()

issuesRoutes.route('/')
  .get(async (req, res, next) => {
    try {
      const { active = 'true' } = req.query
      const activeFilter = active === 'true'
      const issues = await issuesRepo.findWhere({ active: activeFilter })
      return res.json({ issues })
    } catch (e) {
      return next(e)
    }
  })
  .post(async (req, res, next) => {
    try {
      const { title, ownerId, description } = req.body
      const confirmUserExists = usersRepo.findById(ownerId)

      confirmUserExists.catch(e => {
        e.status = 400
        throw e
      })

      const user = await confirmUserExists
      const issue = await issuesRepo.create({ title, ownerId, description })

      return res.status(201).json({ issue })
    } catch (e) {
      return next(e)
    }
  })

module.exports = issuesRoutes
