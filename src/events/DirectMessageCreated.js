const { TextMessage } = require("hubot/es2015");

class DirectMessageCreated extends TextMessage {
  constructor({ eventTime, message }) {
    const u = message.user;
    message.user.room = message.channelId;
    super(message.user, message.plainText, message.id);

    this.rawText = message.text;
    this.embedded = message.embedded;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
  }
}

module.exports = DirectMessageCreated;
