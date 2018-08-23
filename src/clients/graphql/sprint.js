const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Sprint',
  fields: {
    name: {
      type: GraphQLString
    },
    teamId: { type: GraphQLID },
    id: { type: GraphQLID },
    active: { type: GraphQLBoolean }
  }
})
