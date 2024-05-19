import {
  Joined,
  Left,
  MessageCreated,
  DirectMessageCreated,
  ChannelCreated,
  ChannelTopicChanged,
  UserCreated,
  StampCreated,
  TagAdded,
  TagRemoved,
  BotMessageStampsUpdated
} from "./events/events.js"

const TOKEN_HEADER = "X-TRAQ-BOT-TOKEN"
const EVENT_HEADER = "X-TRAQ-BOT-EVENT"

export default class TraQEventHandler {
  constructor(token, request) {
    this.token = token
    this.request = request
  }

  parseHTTPRequest(req) {
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

    return this.parse(eventName, req.body)
  }

  parse(eventName, jsonBody) {
    switch (eventName) {
    case "PING":
      return null
    case "JOINED":
      return this.joined(jsonBody)
    case "LEFT":
      return this.left(jsonBody)
    case "MESSAGE_CREATED":
      return this.messageCreated(jsonBody)
    case "DIRECT_MESSAGE_CREATED":
      return this.directMessageCreated(jsonBody)
    case "CHANNEL_CREATED":
      return this.channelCreated(jsonBody)
    case "CHANNEL_TOPIC_CHANGED":
      return this.channelTopicChanged(jsonBody)
    case "USER_CREATED":
      return this.userCreated(jsonBody)
    case "STAMP_CREATED":
      return this.stampCreated(jsonBody)
    case "TAG_ADDED":
      return this.tagAdded(jsonBody)
    case "TAG_REMOVED":
      return this.tagRemoved(jsonBody)
    case "BOT_MESSAGE_STAMPS_UPDATED":
      return this.botMessageStampsUpdated(jsonBody)
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
  botMessageStampsUpdated(data) {
    data.stamps.forEach(v => {
      v.stampName = this.request.stampIDToName(v.stampId)
    })

    return {
      type: "botMessageStampsUpdated",
      data: new BotMessageStampsUpdated(data)
    }
  }
}
