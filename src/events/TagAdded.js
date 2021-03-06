const { Message } = require("hubot/es2015")
const { createNullUser } = require("../nullUser")

class TagAdded extends Message {
  constructor({ eventTime, tagId, tag }, done) {
    const user = createNullUser()
    super(user, done)

    this.type = "TagAdded"
    this.eventTime = eventTime
    this.tagId = tagId
    this.tag = tag
  }
}

module.exports = TagAdded
