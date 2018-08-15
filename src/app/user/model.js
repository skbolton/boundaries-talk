const { attributes } = require('structure')

class User { }

const Model = attributes({
  id: String,
  firstName: {
    required: true,
    minLength: 2,
    type: String
  },
  lastName: {
    required: true,
    minLength: 2,
    type: String
  },
  teamId: {
    required: true,
    type: String
  }
})(User)

module.exports = Model
