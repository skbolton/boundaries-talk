const createUserAction = require('../create_user')
const Team = require('../../team/model')
const User = require('../../user/model')

const mockTeamsRepo = {
  findById: jest.fn()
}
const mockUsersRepo = {
  create: jest.fn()
}
const mockBus = {
  publish: jest.fn()
}

const createUser = createUserAction({
  usersRepo: mockUsersRepo,
  teamsRepo: mockTeamsRepo,
  bus: mockBus
})

describe('creating new users', () => {
  it('errors if passed an invalid team', () => {
    // make repo return that team does not exist
    mockTeamsRepo.findById.mockResolvedValueOnce(null)
    const input = { firstName: 'Stephen', lastName: 'Bolton', teamId: 1 }

    const expected = /Cannot create user without valid team to assign to/
    const actual = createUser(input)

    return expect(actual).rejects.toThrow(expected)
  })

  it('creates user and publishes user created event to event bus', async () => {
    const firstName = 'Walter'
    const lastName = 'Bigsby'
    const teamId = 3
    const team = new Team({ id: teamId, name: 'Hiya' })
    const user = new User({ firstName, lastName, teamId })
    mockTeamsRepo.findById.mockResolvedValueOnce(team)
    mockUsersRepo.create.mockResolvedValueOnce(user)

    const input = {
      firstName,
      lastName,
      teamId
    }

    const expected = user.toJSON()
    const actual = await createUser(input)

    expect(actual).toEqual(expected)
    expect(mockBus.publish).toHaveBeenCalledWith('wtfs.user.created', { event: user.toJSON() })
  })
})
