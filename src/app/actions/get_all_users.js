/**
 * Gets all users
 */

const getAllUsersAction = ({ usersRepo }) => () =>
  usersRepo.findAll()

module.exports = getAllUsersAction
