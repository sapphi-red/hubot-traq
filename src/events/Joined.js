const Base = require("./Base");

class Joined extends Base {
  constructor({ eventTime, channel }, done) {
    super(eventTime, done);

    this.channel = channel;
  }
}

module.exports = Joined;
