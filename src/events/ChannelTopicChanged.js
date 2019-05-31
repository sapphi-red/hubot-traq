const { TopicMessage } = require("hubot/es2015");

class ChannelTopicChanged extends TopicMessage {
  constructor({ eventTime, channel, topic, updater }) {
    const u = updater;
    u.room = channel;
    const text = topic;
    const id = null;
    super(u, text, id);

    this.eventTime = eventTime;
  }
}

module.exports = ChannelTopicChanged;
