const { TopicMessage } = require("hubot/es2015");

class ChannelTopicChanged extends TopicMessage {
  constructor({ eventTime, channel, topic, updater }) {
    const u = Object.assign({}, updater);
    u.room = {
      type: "channel",
      id: channel.id,
      data: channel
    };
    const text = topic;
    const id = null;
    super(u, text, id);

    this.eventTime = eventTime;
    this.channel = channel;
    this.topic = topic;
    this.updater = updater;
  }
}

module.exports = ChannelTopicChanged;
