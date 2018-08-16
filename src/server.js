const express = require('express')
const apiRoutes = require('./routes')

module.exports = (port = 3000) => {
  const app = express()

  app.use(express.json())
  app.use('/api', apiRoutes)

  // Error handling middleware
  app.use((err, _req, res, _next) => {
    const { status = 500, message = 'Unknown Error Occured' } = err
    console.log(message)
    return res.status(status).json({ error: message })
  })

  const server = app.listen(port, () => console.log(`Server running on port ${port}`))
  return server
}

