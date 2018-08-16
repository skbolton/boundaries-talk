const { attributes } = require('structure')

class Sprint { }

const Model = attributes({
  id: String,
  teamId: {
    type: String,
    required: true
  },
  name: {
    required: true,
    minLength: 2,
    type: String
  },
  active: {
    type: Boolean,
    default: true
  }
})(Sprint)

module.exports = Model
