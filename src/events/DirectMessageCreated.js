import { TextMessage } from "hubot"

export default class DirectMessageCreated extends TextMessage {
  constructor({ eventTime, message }) {
    const u = {
      ...message.user,
      room: {
        type: "dm",
        id: message.user.id
      }
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
