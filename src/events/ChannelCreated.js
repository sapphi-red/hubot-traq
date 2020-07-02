const { Message } = require("hubot/es2015")

class ChannelCreated extends Message {
  constructor({ eventTime, channel }, done) {
    const u = {
      ...channel.creator,
      room: {
        type: "channel",
        id: channel.id,
        data: channel
      }
    }
    super(u, done)

    this.type = "ChannelCreated"
    this.eventTime = eventTime
    this.channel = channel
  }
}

module.exports = ChannelCreated
