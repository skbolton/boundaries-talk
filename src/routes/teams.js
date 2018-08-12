const { Router } = require('express')
const teamsRepo = require('../repositories/team')

const teamsRoutes = Router()

teamsRoutes.route('/')
  .post(async (req, res, next) => {
    try {
      const { name } = req.body
      const team = await teamsRepo.create({ name })

      return res.status(201).json({ team })
    } catch (e) {
      return next(e)
    }
  })
  .get(async (req, res, next) => {
    try {
      const teams = await teamsRepo.findAll()

      return res.json({ teams })
    } catch (e) {
      return next(e)
    }
  })

module.exports = teamsRoutes
