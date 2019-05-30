const Base = require("./Base");
//TextMessage
class MessageCreated extends Base {
  constructor({ eventTime, message }, done) {
    super(eventTime, done);

    this.message = message;
  }
}

module.exports = MessageCreated;
