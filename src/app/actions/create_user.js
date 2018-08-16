/**
 * Creates a new User
 *
 * Rules:
 *   Team to assign user to has to be valid
 *
 * Emits:
 *   wtfs.user.created
 */

const User = require('../user/model')

const createUserAction = ({
  teamsRepo,
  usersRepo,
  bus
}) => async ({ firstName, lastName, teamId }) => {
  const team = await teamsRepo.findById(teamId)
  if (!team) {
    throw new Error('Cannot create user without valid team to assign to')
  }

  const user = new User({ firstName, lastName, teamId })
  const userValidation = user.validate()

  if (userValidation.errors) {
    throw userValidation.errors
  }

  const createdUser = await usersRepo.create(user.toJSON())
  bus.publish('wtfs.user.created', { event: createdUser })

  return createdUser
}

module.exports = createUserAction
