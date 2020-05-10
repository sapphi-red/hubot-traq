const { Message } = require("hubot/es2015")

class TagAdded extends Message {
  constructor({ eventTime, tagId, tag }, done) {
    const user = {
      id: "00000000-0000-0000-0000-000000000000",
      name: "",
      displayName: "",
      iconFileId: "00000000-0000-0000-0000-000000000000",
      bot: false,
      state: 0,
      updatedAt: new Date(),
      room: {
        type: "none"
      }
    }
    super(user, done)

    this.type = "TagAdded"
    this.eventTime = eventTime
    this.tagId = tagId
    this.tag = tag
  }
}

module.exports = TagAdded
