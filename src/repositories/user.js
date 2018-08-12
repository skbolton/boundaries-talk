const User = require('../db/user')

const findById = id => {
  return User.query()
    .findById(id)
    .throwIfNotFound()
    .context({ id })
    .execute()
}

const create = userData => {
  return User.query()
    .insert(userData)
    .execute()
}

const findAll = () => {
  return User.query()
    .execute()
}

const update = (id, update) => {
  return User.query()
    .patchAndFetchById(id, update)
    .execute()
}

module.exports = {
  findById,
  findAll,
  update,
  create
}
