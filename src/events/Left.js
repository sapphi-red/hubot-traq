import { Message } from "hubot"
import { createNullUser } from "../nullUser.js"

export default class Left extends Message {
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
