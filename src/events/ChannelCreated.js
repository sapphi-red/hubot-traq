const Base = require("./Base");

class ChannelCreated extends Base {
  constructor({ eventTime, channel }, done) {
    super(eventTime, done);

    this.channel = channel;
  }
}

module.exports = ChannelCreated;
