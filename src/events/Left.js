const Base = require("./Base");

class Left extends Base {
  constructor({ eventTime, channel }, done) {
    super(eventTime, done);

    this.channel = channel;
  }
}

module.exports = left;
