const EventEmitter = require('events')

class InMemoryEventEmitter extends EventEmitter {
  constructor () {
    super()
  }

  publish (eventName, payload) {
    this.emit(eventName, payload)
  }
}

module.exports = InMemoryEventEmitter
