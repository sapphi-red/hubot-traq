const { Message } = require("hubot/es2015")

class StampCreated extends Message {
  constructor({ eventTime, id, name, fileId, creator }, done) {
    const user = {
      ...creator,
      room: {
        type: "none"
      }
    }
    super(user, done)

    this.type = "StampCreated"
    this.eventTime = eventTime
    this.id = id
    this.name = name
    this.fileId = fileId
    this.creator = creator
  }
}

module.exports = StampCreated
