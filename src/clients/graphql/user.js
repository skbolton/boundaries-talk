const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: {
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    id: {
      type: GraphQLID
    }
  }
})
