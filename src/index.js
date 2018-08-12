const createServer = require('./server')
const bootstrapDB = require('./db/bootstrap')

console.log('bootstrapping database')
bootstrapDB()
  .then(() => createServer(3000))
