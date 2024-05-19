import { Message } from "hubot"
import { createNullUser } from "../nullUser.js"

export default class TagAdded extends Message {
  constructor({ eventTime, tagId, tag }, done) {
    const user = createNullUser()
    super(user, done)

    this.type = "TagAdded"
    this.eventTime = eventTime
    this.tagId = tagId
    this.tag = tag
  }
}
