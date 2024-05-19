import { Message } from "hubot"

export default class UserCreated extends Message {
  constructor({ eventTime, user }, done) {
    const u = {
      ...user,
      room: {
        type: "none"
      }
    }
    super(u, done)

    this.type = "UserCreated"
    this.eventTime = eventTime
    this.userData = user
  }
}
