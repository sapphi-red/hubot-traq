const { Message } = require("hubot/es2015");

class ChannelCreated extends Message {
  constructor({ eventTime, channel }, done) {
    const u = Object.assign({}, channel.creator);
    const c = Object.assign({}, channel);
    c.creator = null;
    u.room = channel;
    super(u, done);

    this.eventTime = eventTime;
  }
}

module.exports = ChannelCreated;
