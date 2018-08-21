/**
 * Creates a new issue
 *
 * Rules:
 *  Issue has to be created by a valid user in the system
 *
 * Emits:
 *  wtfs.issue.created
 */

const Issue = require('../issue/model')

const createIssueAction = ({
  usersRepo,
  issuesRepo,
  bus
}) => async ({ title, description, createdBy }) => {
  const user = await usersRepo.findById(createdBy)
  if (!user) {
    throw new Error('Cannot create issue without valid createdBy user')
  }

  const issue = new Issue({ title, description, createdBy })

  const issueValidation = issue.validate()

  if (issueValidation.errors) {
    throw issueValidation.errors
  }

  const createdIssue = await issuesRepo.create(issue.toJSON())
  bus.publish('wtfs.issue.created', { event: createdIssue.toJSON() })

  return createdIssue.toJSON()
}

module.exports = createIssueAction
