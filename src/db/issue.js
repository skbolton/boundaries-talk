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

  static get jsonSchema () {
    return {
      type: 'object',
      required: [ 'title', 'ownerId' ],
      properties: {
        title: { type: 'string', minLength: '1' },
        ownerId: { type: 'integer' },
        description: { type: 'string' }
      }
    }
  }
}

module.exports = Issue
