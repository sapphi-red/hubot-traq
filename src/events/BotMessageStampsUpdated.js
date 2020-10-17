const { Message } = require("hubot/es2015")
const { createNullUser } = require("../nullUser")

class BotMessageStampsUpdated extends Message {
  constructor({ eventTime, messageId, stamps }, done) {
    const user = createNullUser()
    super(user, done)

    this.type = "BotMessageStampsUpdated"
    this.eventTime = eventTime
    this.messageId = messageId
    this.stamps = stamps
  }
}

module.exports = BotMessageStampsUpdated
