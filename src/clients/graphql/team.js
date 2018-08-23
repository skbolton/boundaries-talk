const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql')
const Users = require('./user')
const Sprint = require('./sprint')

module.exports = new GraphQLObjectType({
  name: 'Team',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    members: {
      type: GraphQLList(Users),
      resolve ({ id }, _args, { loaders }) {
        const getUsersByParams = loaders.resolve('getUsersByParams')
        return getUsersByParams({ teamId: id })
      }
    },
    activeSprint: {
      type: Sprint,
      resolve ({ id }, _args, { loaders }) {
        const getSprintsByParams = loaders.resolve('getSprintsByParams')
        return getSprintsByParams({ teamId: id, active: true })
          .then(result => {
            return result
              ? result[0]
              : null
          })
      }
    }
  }
})
