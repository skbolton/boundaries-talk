/**
 * Creates a new sprint
 *
 * Rules:
 *  Sprint has to belong to a valid team
 *  Team cannot currently have an active sprint
 *
 * Emits:
 *  wtfs.sprint.created
 */

const Sprint = require('../sprint/model')

const createSprintAction = ({
  teamsRepo,
  sprintsRepo,
  bus
}) => async ({ teamId, name }) => {
  const team = teamsRepo.findById(teamId)
  if (!team) {
    throw new Error('Sprint cannot be created without a valid team')
  }

  const activeSprintsForTeam = await sprintsRepo.findWhere({ teamId, active: true })
  if (activeSprintsForTeam.length > 0) {
    throw new Error(`Cannot create sprint team [${teamId}] already has an active sprint`)
  }

  const sprint = new Sprint({ name, teamId })
  const sprintValidation = sprint.validate()
  if (sprintValidation.errors) {
    throw sprintValidation.errors
  }

  const createdSprint = await sprintsRepo.create(sprint.toJSON())
  bus.publish('wtfs.sprint.created', { event: createdSprint })

  return createdSprint
}

module.exports = createSprintAction
