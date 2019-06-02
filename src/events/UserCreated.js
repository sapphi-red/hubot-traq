const { Message } = require("hubot/es2015");

class UserCreated extends Message {
  constructor({ eventTime, user }, done) {
    user.room = {
      type: "none"
    };
    super(user, done);

    this.type = "UserCreated";
    this.eventTime = eventTime;
    this.userData = user;
  }
}

module.exports = UserCreated;
