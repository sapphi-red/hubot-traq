import { Message } from "hubot"
import { createNullUser } from "../nullUser.js"

export default class BotMessageStampsUpdated extends Message {
  constructor({ eventTime, messageId, stamps }, done) {
    const user = createNullUser()
    super(user, done)

    this.type = "BotMessageStampsUpdated"
    this.eventTime = eventTime
    this.messageId = messageId
    this.stamps = stamps
  }
}
