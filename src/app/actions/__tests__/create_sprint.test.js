const createSprintAction = require('../create_sprint')
const Sprint = require('../../sprint/model')
const Team = require('../../team/model')

const mockTeamsRepo = {
  findById: jest.fn()
}
const mockSprintsRepo = {
  findWhere: jest.fn(),
  create: jest.fn()
}
const mockBus = {
  publish: jest.fn()
}

const createSprint = createSprintAction({
  teamsRepo: mockTeamsRepo,
  sprintsRepo: mockSprintsRepo,
  bus: mockBus
})

describe('creating new sprints', () => {
  it('errors if not passed a valid team', () => {
    // have teamsRepo return that team is not valid
    mockTeamsRepo.findById.mockResolvedValueOnce(null)
    const input = {
      teamId: 99,
      name: 'some sprint name'
    }

    const expected = /Sprint cannot be created without a valid team/
    const actual = createSprint(input)

    return expect(actual).rejects.toThrow(expected)
  })

  it('errors if team already has an active sprint', () => {
    const team = new Team({ id: 1, name: 'Apollo' })
    mockTeamsRepo.findById.mockResolvedValueOnce(team)
    mockSprintsRepo.findWhere.mockResolvedValueOnce([
      team
    ])

    const input = {
      teamId: 1,
      name: 'Some Sprint name'
    }

    const expected = /already has an active sprint/
    const actual = createSprint(input)

    return expect(actual).rejects.toThrow(expected)
  })

  it('creates sprints and publishes sprint created event to event bus', async () => {
    const sprintName = 'A Sprint name'
    const teamId = 2
    const team = new Team({ id: teamId, name: 'Archimedes' })
    const sprint = new Sprint({ id: 1, name: sprintName, teamId })
    mockTeamsRepo.findById.mockResolvedValueOnce(team)
    // make team have no active sprints
    mockSprintsRepo.findWhere.mockResolvedValueOnce([])
    mockSprintsRepo.create.mockResolvedValueOnce(sprint)

    const input = { name: sprintName, teamId }

    const expected = sprint.toJSON()
    const actual = await createSprint(input)

    expect(actual).toEqual(expected)
    expect(mockBus.publish).toHaveBeenCalledWith('wtfs.sprint.created', { event: sprint.toJSON() })
  })
})
