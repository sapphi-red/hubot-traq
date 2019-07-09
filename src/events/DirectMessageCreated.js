const { TextMessage } = require("hubot/es2015")

class DirectMessageCreated extends TextMessage {
  constructor({ eventTime, message }) {
    const u = Object.assign({}, message.user)
    u.room = {
      type: "dm",
      id: message.user.id
    }
    super(u, message.plainText, message.id)

    this.eventTime = eventTime
    this.message = message
    this.rawText = message.text
    this.embedded = message.embedded
    this.createdAt = message.createdAt
    this.updatedAt = message.updatedAt
  }
}

module.exports = DirectMessageCreated
