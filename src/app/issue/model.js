const { attributes } = require('structure')

class Issue { }

const Model = attributes({
  id: String,
  createdBy: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    minLength: 1
  },
  description: String,
  active: {
    type: Boolean,
    default: true
  }
})(Issue)

module.exports = Model
