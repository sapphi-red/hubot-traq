const { Message } = require("hubot/es2015");

class UserCreated extends Message {
  constructor({ eventTime, user }, done) {
    user.room = null;
    super(user, done);

    this.eventTime = eventTime;
    this.userData = user;
  }
}

module.exports = UserCreated;
