const { Model } = require('objection')

class Issue extends Model {
  static get tableName () {
    return 'issues'
  }

  static get relationMappings () {
    return {
      owner: {
        relation: Model.HasOneRelation,
        modelClass: require('./user'),
        join: {
          from: 'issues.ownerId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Issue
