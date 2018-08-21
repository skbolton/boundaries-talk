const createIssueAction = require('../create_issue')
const User = require('../../user/model')
const Issue = require('../../issue/model')

const mockUsersRepo = {
  findById: jest.fn()
}
const mockIssuesRepo = {
  create: jest.fn()
}
const mockBus = {
  publish: jest.fn()
}

const createIssue = createIssueAction({
  usersRepo: mockUsersRepo,
  issuesRepo: mockIssuesRepo,
  bus: mockBus
})

describe('creating new issues', () => {
  it('errors if not passed a valid user', () => {
    // make repo return that it couldn't find user
    mockUsersRepo.findById.mockResolvedValueOnce(null)
    const input = {
      title: 'A title',
      description: 'Some Description',
      createdBy: 99
    }

    const expected = /Cannot create issue without valid createdBy user/
    const actual = createIssue(input)

    return expect(actual).rejects.toThrow(expected)
  })

  it('can create issues and publishes created issue event to event bus', async () => {
    const title = 'A Title'
    const description = 'A description'
    const user = new User({
      firstName: 'Stephen',
      lastName: 'Bolton',
      id: 1
    })
    const issue = new Issue({
      id: 1,
      title,
      description
    })
    mockUsersRepo.findById.mockResolvedValueOnce(user)
    mockIssuesRepo.create.mockResolvedValueOnce(issue)

    const input = {
      title: 'A Title',
      description: 'A Description',
      createdBy: 1
    }

    const expected = issue.toJSON()
    const actual = await createIssue(input)

    expect(actual).toEqual(expected)
    expect(mockBus.publish).toHaveBeenCalledWith('wtfs.issue.created', { event: issue.toJSON() })
  })
})
