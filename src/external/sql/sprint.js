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
}

module.exports = Sprint
