const { Router } = require('express')

const usersRoutes = Router()

usersRoutes.route('/')
  .get(async (req, res, next) => {
    try {
      const getAllUsers = req.scope.resolve('getAllUsers')
      const users = await getAllUsers()
      return res.json({ users })
    } catch (e) {
      return next(e)
    }
  })
  .post(async (req, res, next) => {
    try {
      const { firstName, lastName, teamId } = req.body
      const createUserAction = req.scope.resolve('createUser')
      const user = await createUserAction({ firstName, lastName, teamId })

      return res.status(201).json({ user })
    } catch (e) {
      return next(e)
    }
  })

module.exports = usersRoutes
