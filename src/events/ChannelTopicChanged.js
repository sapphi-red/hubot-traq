const { Message } = require("hubot/es2015")

class ChannelTopicChanged extends Message {
  constructor({ eventTime, channel, topic, updater }, done) {
    const u = {
      ...updater,
      room: {
        type: "channel",
        id: channel.id,
        data: channel
      }
    }
    super(u, done)

    this.eventTime = eventTime
    this.channel = channel
    this.topic = topic
    this.updater = updater
  }
}

module.exports = ChannelTopicChanged
