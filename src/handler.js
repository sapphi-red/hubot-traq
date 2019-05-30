const {
  Ping,
  Joined,
  Left,
  MessageCreated,
  DirectMessageCreated,
  ChannelCreated,
  ChannelTopicChanged,
  UserCreated
} = require("./events");

const TOKEN_HEADER = "X-TRAQ-BOT-TOKEN";
const EVENT_HEADER = "X-TRAQ-BOT-EVENT";

class TraQEventHandler {
  constructor(token) {
    this.token = token;
  }

  parse(req) {
    const token = req.get(TOKEN_HEADER);
    if (!token || token !== this.token) {
      throw new Error("受け取ったトークンが不正です");
    }

    const eventName = req.get(EVENT_HEADER);
    if (!eventName) {
      throw new Error("イベント名が存在しません");
    }

    if (!req.is("json")) {
      throw new Error("不正なJSONです");
    }

    switch (eventName) {
      case "PING":
        return this.ping(req.body);
      case "JOINED":
        return this.joined(req.body);
      case "LEFT":
        return this.left(req.body);
      case "MESSAGE_CREATED":
        return this.messageCreated(req.body);
      case "DIRECT_MESSAGE_CREATED":
        return this.directMessageCreated(req.body);
      case "CHANNEL_CREATED":
        return this.channelCreated(req.body);
      case "CHANNEL_TOPIC_CHANGED":
        return this.channelTopicChanged(req.body);
      case "USER_CREATED":
        return this.userCreated(req.body);
      default:
        return {
          type: "unknown",
          data: req.body
        };
    }
  }

  ping(data) {
    return {
      type: "ping",
      data: new Ping(data)
    };
  }
  joined(data) {
    return {
      type: "joined",
      data: new Joined(data)
    };
  }
  left(data) {
    return {
      type: "left",
      data: new Left(data)
    };
  }
  messageCreated(data) {
    return {
      type: "messageCreated",
      data: new MessageCreated(data)
    };
  }
  directMessageCreated(data) {
    return {
      type: "directMessageCreated",
      data: new DirectMessageCreated(data)
    };
  }
  channelCreated(data) {
    return {
      type: "channelCreated",
      data: new ChannelCreated(data)
    };
  }
  channelTopicChanged(data) {
    return {
      type: "channelTopicChanged",
      data: new ChannelTopicChanged(data)
    };
  }
  userCreated(data) {
    return {
      type: "userCreated",
      data: new UserCreated(data)
    };
  }
}

module.exports = TraQEventHandler;
