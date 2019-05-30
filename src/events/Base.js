class Base {
  constructor({ eventTime }, done = false) {
    this.eventTime = eventTime;
  }

  // hubot/src/message.js Message.finish()と同様
  finish() {
    this.done = true;
  }
}

module.exports = Base;
