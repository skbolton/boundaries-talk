const { Router } = require('express')
const issuesRoutes = require('./issues')
// const usersRoutes = require('./users')
// const sprintsRoutes = require('./sprints')
// const teamsRoutes = require('./teams')

const apiRoutes = Router()

apiRoutes.use('/issues', issuesRoutes)
// apiRoutes.use('/users', usersRoutes)
// apiRoutes.use('/sprints', sprintsRoutes)
// apiRoutes.use('/teams', teamsRoutes)

module.exports = apiRoutes
