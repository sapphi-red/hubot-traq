const { Message } = require("hubot/es2015");

class ChannelCreated extends Message {
  constructor({ eventTime, channel }, done) {
    const u = Object.assign({}, channel.creator);
    const c = Object.assign({}, channel);
    c.creator = null;
    u.room = {
      type: "channel",
      id: channel.id,
      data: channel
    };
    super(u, done);

    this.eventTime = eventTime;
    this.channel = channel;
  }
}

module.exports = ChannelCreated;
