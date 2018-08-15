const { attributes } = require('structure')

class Team {}

const Model = attributes({
  id: String,
  name: {
    type: String,
    minLength: 2,
    maxLength: 30
  }
})(Team)

module.exports = Team
