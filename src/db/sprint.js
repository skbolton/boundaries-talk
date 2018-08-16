const { Model } = require('objection')

class Sprint extends Model {
  static get tableName () {
    return 'sprints'
  }

  static get relationMappings () {
    return {
      issues: {
        relation: Model.HasManyRelation,
        modelClass: require('./issue'),
        join: {
          from: 'sprints.id',
          to: 'issues.id'
        }
      },
      team: {
        relation: Model.HasOneRelation,
        modelClass: require('./team'),
        join: {
          from: 'sprints.teamId',
          to: 'teams.id'
        }
      }
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [ 'name', 'teamId' ],
      properties: {
        teamId: { type: 'integer' },
        name: { type: 'string', minLength: 2 },
        active: { type: 'boolean', default: true }
      }
    }
  }
}

module.exports = Sprint
