/**
 * Creates a new team
 *
 * Rules:
 *  Team name has to be unique
 *
 * Emits:
 *  wtfs.team.created
 */

const Team = require('../team/model')

const createTeamAction = ({
  teamsRepo,
  bus
}) => async ({ name }) => {
  const teamNameTaken = await teamsRepo.findWhere({ name })
  if (teamNameTaken.length > 0) {
    throw new Error(`Cannot create new team. Name ${name} already taken`)
  }

  const team = new Team({ name })
  const teamValidation = team.validate()
  if (teamValidation.errors) {
    throw new teamValidation.errors
  }

  const createdTeam = await teamsRepo.create(team.toJSON())
  bus.publish('wtfs.team.created', { event: createdTeam.toJSON() })

  return createdTeam.toJSON()
}

module.exports = createTeamAction
