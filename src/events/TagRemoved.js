import { Message } from "hubot"
import { createNullUser } from "../nullUser.js"

export default class TagRemoved extends Message {
  constructor({ eventTime, tagId, tag }, done) {
    const user = createNullUser()
    super(user, done)

    this.type = "TagRemoved"
    this.eventTime = eventTime
    this.tagId = tagId
    this.tag = tag
  }
}
