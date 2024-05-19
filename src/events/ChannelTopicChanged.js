import { Message } from "hubot"

export default class ChannelTopicChanged extends Message {
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
