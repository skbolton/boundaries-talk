const express = require('express')
const graphqlHTTP = require('express-graphql')
const DIContainer = require('../../main')
const GraphQLSchema = require('../graphql/schema')
const container = DIContainer()
const apiRoutes = require('./routes')

module.exports = (port = 3000) => {
  const app = express()

  app.use((req, _res, next) => {
    req.scope = container.createScope()
    return next()
  })

  app.use(express.json())
  app.use('/api', apiRoutes)


  app.get('/graph', graphqlHTTP((req, _res) => ({
    schema: GraphQLSchema,
    graphiql: true,
    context: {
      loaders: req.scope
    }
  })))

  app.post(
  '/graph',
  graphqlHTTP((req, _res) => ({
    schema: GraphQLSchema,
    graphiql: true,
    context: {
      loaders: req.scope
    }
  }))
)


  // Error handling middleware
  app.use((err, _req, res, _next) => {
    const { status = 500, message = 'Unknown Error Occured' } = err
    console.log(message)
    return res.status(status).json({ error: message })
  })

  const server = app.listen(port, () => console.log(`Server running on port ${port}`))
  return server
}

