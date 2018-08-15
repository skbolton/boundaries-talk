const UserModel = require('../app/user/model')
const UserSQL = require('./sql/user')

const create = user => {
  return UserSQL.query()
    .insert(user)
    .then(user => new UserModel(user))
}

const findById = id => {
  return UserSQL.query()
    .findById(id)
    .then(user => {
      return user
        ? new UserModel(user)
        : null
    })
}

const findAll = () => {
  return UserSQL.query()
    .then(users => users.map(user => new UserModel(user)))
}

module.exports = () => {
  return {
    create,
    findById,
    findAll
  }
}
