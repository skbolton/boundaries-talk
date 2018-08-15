const { attributes } = require('structure')

class Sprint {
  constructor (...args) {
    console.log(...args)
  }
}

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
    required: true
  }
})(Sprint)

