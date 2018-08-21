const teamsRepoFactory = require('../teamsRepo')
const TeamSQL = require('../sql/team')
const Team = require('../../app/team/model')
// we have to require connection file
const connection = require('../sql/connection')

beforeEach(async () => {
  await connection.migrate.latest({
    directory: 'src/external/sql/migrations/'
  })
  // seed database with some teams
  await TeamSQL.query()
    .insert([
      // 1
      { name: 'Archimedes' },
      // 2
      {name: 'Newton' },
      // 3
      { name: 'Hiya' }
    ])
    .execute()
})
afterEach(async () => {
  await connection.migrate.rollback({
    directory: 'src/external/sql/migrations'
  })
})

afterAll(() => connection.destroy())

const teamsRepo = teamsRepoFactory()

describe('Teams Repository', () => {
  it('can create new teams', async () => {
    const team = new Team({ name: 'Kapteyn' })

    const expected = {
      id: "4",
      name: 'Kapteyn'
    }
    const actual = await teamsRepo.create(team.toJSON())

    expect(actual).toMatchObject(expected)
    expect(team).toBeInstanceOf(Team)
  })
  it('can fetch team by id', async () => {
    const id = 1
    const expected = new Team({ id: 1, name: 'Archimedes' })
    const actual = await teamsRepo.findById(id)

    expect(actual).toEqual(expected)
  })

  it('can fetch all teams', async () => {
    const expected = [
      new Team({ id: "1", name: 'Archimedes' }),
      new Team({ id: "2", name: 'Newton' }),
      new Team({ id: "3", name: 'Hiya' })
    ]
    const actual = await teamsRepo.findAll()

    expect(actual).toEqual(expected)
  })

  it('can find teams by parameters', async () => {
    const params = {
      name: 'Newton'
    }
    const expected = [ new Team({ id: 2, name: 'Newton' }) ]
    const actual = await teamsRepo.findWhere(params)

    expect(actual).toEqual(expected)
  })
})
