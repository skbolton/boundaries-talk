/**
 * Gets issues based on issue params
 */

const getIssuesByParamsAction = ({ issuesRepo }) => params => issuesRepo.findWhere(params)

module.exports = getIssuesByParamsAction
