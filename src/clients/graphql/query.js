const { GraphQLObjectType, GraphQLList } = require('graphql')
const Team = require('./team')
const User = require('./user')

module.exports = new GraphQLObjectType({
  name: 'Query',
  description: 'Welcome to the coolest graphql app ever',
  fields:{
    teams: {
      description: 'All of the Development Teams',
      type: new GraphQLList(Team),
      resolve (_obj, _args, { loaders }) {
        const getAllTeams = loaders.resolve('getAllTeams')
        return getAllTeams()
      }
    },
    users: {
      description: 'All the users',
      type: new GraphQLList(User),
      resolve(_obj, _args, { loaders }) {
        const getAllUsers = loaders.resolve('getAllUsers')
        return getAllUsers()
      }
    }
  }
})
