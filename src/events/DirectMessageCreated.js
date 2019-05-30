const Base = require("./Base");

class DirectMessageCreated extends Base {
  constructor({ eventTime, message }, done) {
    super(eventTime, done);

    this.message = message;
  }
}

module.exports = DirectMessageCreated;
