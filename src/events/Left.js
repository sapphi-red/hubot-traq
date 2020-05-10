const { Message } = require("hubot/es2015")
const { createNullUser } = require("../nullUser")

class Left extends Message {
  constructor({ eventTime, channel }, done) {
    const user = createNullUser()
    user.room = {
      type: "channel",
      id: channel.id,
      data: channel
    }
    super(user, done)

    this.type = "Left"
    this.eventTime = eventTime
    this.channel = channel
  }
}

module.exports = Left
