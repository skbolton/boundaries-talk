/**
 * Gets users based on passed in parameters
 */

const getUsersByParams = ({
  usersRepo
}) => async params => usersRepo.findWhere(params)

module.exports = getUsersByParams
