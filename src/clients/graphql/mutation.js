const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')
const Sprint = require('./sprint')

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The mutations that are allowed',
  fields: {
    createSprint: {
      description: 'Creates a new sprint',
      type: Sprint,
      args: {
        teamId: {
          type: GraphQLID
        },
        name: {
          type: GraphQLString
        }
      },
      resolve (_obj, { teamId, name }, { loaders }) {
        const createSprint = loaders.resolve('createSprint')
        return createSprint({ name, teamId })
      }
    }
  }
})
