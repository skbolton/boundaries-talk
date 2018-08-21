const createTeamAction = require('../create_team')
const Team = require('../../team/model')

const mockTeamsRepo = {
  findWhere: jest.fn(),
  create: jest.fn()
}
const mockBus = {
  publish: jest.fn()
}

const createTeam = createTeamAction({
  teamsRepo: mockTeamsRepo,
  bus: mockBus
})

describe('creating new teams', () => {
  it('errors if team name is already taken', () => {
    const teamName = 'Newton'
    const team = new Team({ id: 1, name: teamName })
    mockTeamsRepo.findWhere.mockResolvedValueOnce([Team])

    const input = {
      name: teamName
    }

    const expected = /already taken/
    const actual = createTeam({ name: teamName })

    return expect(actual).rejects.toThrow(expected)
  })

  it('creates a team and publishes a new team created event to event bus', async () => {
    const teamName = 'Galileo'
    const team = new Team({ id: 1, name: teamName })
    // make so that name is available
    mockTeamsRepo.findWhere.mockResolvedValueOnce([])
    mockTeamsRepo.create.mockResolvedValueOnce(team)

    const expected = team.toJSON()
    const actual = await createTeam({ name: teamName })

    expect(actual).toEqual(expected)
    expect(mockBus.publish).toHaveBeenCalledWith('wtfs.team.created', { event: team.toJSON() })
  })
})
