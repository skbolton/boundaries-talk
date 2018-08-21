const request = require('supertest')
const createServer = require('../server')
const connection = require('../../../external/sql/connection')

describe('POST to /sprints', () => {
  let server
  beforeAll(() => {
    server = createServer(3000)
  })

  afterAll(() => {
    server.close()
    return connection.destroy()
  })

  beforeEach(async () => {
    await connection.migrate.latest({
      directory: 'src/external/sql/migrations'
    })
    await connection.seed.run({
      directory: 'src/external/sql/seeds'
    })
  })

  afterEach(async () => {
    await connection.migrate.rollback({
      directory: 'src/external/sql/migrations'
    })
  })

  it('can create new sprints', () => {
    const payload = {
      name: 'A sprint to remember',
      teamId: "1"
    }

    return request(server)
      .post('/api/sprints')
      .send(payload)
      .expect(201)
      .then(result => {
        expect(result.body.sprint.name).toEqual('A sprint to remember')
      })
  })
})
