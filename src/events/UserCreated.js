const Base = require("./Base");

class UserCreated extends Base {
  constructor({ eventTime, user }, done) {
    super(eventTime, done);

    this.user = user;
  }
}

module.exports = UserCreated;
