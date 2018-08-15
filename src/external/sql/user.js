const { Model } = require('objection')

class User extends Model {
  $beforeInsert() {
    this.createdAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString()
}

  static get tableName () {
    return 'users'
  }

  static createNotFoundError ({ id }) {
    return id
      ? new Error(`Cannot find user by id ${id}`)
      : new Error('Cannot find user')
  }

  static get relationMappings () {
    return {
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./team'),
        join: {
          from: 'users.id',
          to: 'teams.id'
        }
      }
    }
  }
}

module.exports = User
