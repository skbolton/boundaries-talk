/**
 * Fetches all teams
 *
 */

const getAllTeamsAction = ({ teamsRepo }) => () =>
  teamsRepo.findAll()

module.exports = getAllTeamsAction
