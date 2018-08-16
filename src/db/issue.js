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
          from: 'issues.createdBy',
          to: 'users.id'
        }
      }
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [ 'title', 'createdBy' ],
      properties: {
        title: { type: 'string', minLength: '1' },
        createdBy: { type: 'integer' },
        description: { type: 'string' },
        active: { type: 'boolean', default: true }
      }
    }
  }
}

module.exports = Issue
