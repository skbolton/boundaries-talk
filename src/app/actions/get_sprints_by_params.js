/**
 * Gets sprints by passed in sprint fields
 *
 */

const getSprintsByParams = ({ sprintsRepo }) => params =>
  sprintsRepo.findWhere(params)

module.exports = getSprintsByParams
