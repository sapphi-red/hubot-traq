const {
  Joined,
  Left,
  MessageCreated,
  DirectMessageCreated,
  ChannelCreated,
  ChannelTopicChanged,
  UserCreated,
  StampCreated,
  TagAdded,
  TagRemoved
} = require("./events/events")

const TOKEN_HEADER = "X-TRAQ-BOT-TOKEN"
const EVENT_HEADER = "X-TRAQ-BOT-EVENT"

class TraQEventHandler {
  constructor(token) {
    this.token = token
  }

  parse(req) {
    const token = req.get(TOKEN_HEADER)
    if (!token || token !== this.token) {
      throw new Error("受け取ったトークンが不正です")
    }

    const eventName = req.get(EVENT_HEADER)
    if (!eventName) {
      throw new Error("イベント名が存在しません")
    }

    if (!req.is("json")) {
      throw new Error("不正なJSONです")
    }

    switch (eventName) {
    case "PING":
      return null
    case "JOINED":
      return this.joined(req.body)
    case "LEFT":
      return this.left(req.body)
    case "MESSAGE_CREATED":
      return this.messageCreated(req.body)
    case "DIRECT_MESSAGE_CREATED":
      return this.directMessageCreated(req.body)
    case "CHANNEL_CREATED":
      return this.channelCreated(req.body)
    case "CHANNEL_TOPIC_CHANGED":
      return this.channelTopicChanged(req.body)
    case "USER_CREATED":
      return this.userCreated(req.body)
    case "STAMP_CREATED":
      return this.stampCreated(req.body)
    case "TAG_ADDED":
      return this.tagAdded(req.body)
    case "TAG_REMOVED":
      return this.tagRemoved(req.body)
    default:
      return null
    }
  }

  joined(data) {
    return {
      type: "joined",
      data: new Joined(data)
    }
  }
  left(data) {
    return {
      type: "left",
      data: new Left(data)
    }
  }
  messageCreated(data) {
    return {
      type: "messageCreated",
      data: new MessageCreated(data)
    }
  }
  directMessageCreated(data) {
    return {
      type: "directMessageCreated",
      data: new DirectMessageCreated(data)
    }
  }
  channelCreated(data) {
    return {
      type: "channelCreated",
      data: new ChannelCreated(data)
    }
  }
  channelTopicChanged(data) {
    return {
      type: "channelTopicChanged",
      data: new ChannelTopicChanged(data)
    }
  }
  userCreated(data) {
    return {
      type: "userCreated",
      data: new UserCreated(data)
    }
  }
  stampCreated(data) {
    return {
      type: "stampCreated",
      data: new StampCreated(data)
    }
  }
  tagAdded(data) {
    return {
      type: "tagAdded",
      data: new TagAdded(data)
    }
  }
  tagRemoved(data) {
    return {
      type: "tagRemoved",
      data: new TagRemoved(data)
    }
  }
}

module.exports = TraQEventHandler
