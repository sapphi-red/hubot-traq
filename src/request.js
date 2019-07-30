const { Apis } = require("traq-api")

const createArgError = (path, obj) => {
  return new Error(`無効な引数が渡されました: ${path}: ${JSON.stringify(obj)}`)
}

class Request {
  constructor(token, robot) {
    this.token = token
    this.robot = robot

    this.api = new Apis({
      accessToken: this.token
    })

    this.stampIDTablePromise = new Promise(async resolve => {
      resolve((await this.api.getStamps()).data)
    })
  }

  sendMessage(envelope, ...strings) {
    const texts = []
    const stamps = []
    for (const string of strings) {
      if (typeof string === "string") {
        texts.push(string)
        continue
      }
      if (string.type === "stamp") {
        stamps.push(string)
      }
    }

    const promises = []
    if (texts.length > 0) {
      promises.push(this.sendTextMessage(envelope, ...texts))
    }
    if (stamps.length > 0) {
      promises.push(this.sendStamp(envelope, ...stamps))
    }
    return Promise.all(promises)
  }
  sendTextMessage(envelope, ...strings) {
    const { room, channelID, userID } = envelope

    if (room && room.type === "none") {
      throw new Error("envelope.room.typeはnoneです")
    }

    if ((room && room.type === "channel") || channelID) {
      const id = channelID || room.id
      return this.sendMessageToChannel(id, ...strings)
    }

    if ((room && room.type === "dm") || userID) {
      const id = userID || room.id
      return this.sendMessageToUser(id, ...strings)
    }

    throw createArgError("hubot-traq/request/sendTextMessage()", envelope)
  }
  sendMessageToChannel(channelID, ...strings) {
    return this.api.postMessage(channelID, {
      text: strings.join("\n")
    })
  }
  sendMessageToUser(userID, ...strings) {
    return this.api.postDirectMessage(userID, {
      text: strings.join("\n")
    })
  }
  async sendStamp(envelope, ...stamps) {
    const { message, messageID } = envelope
    if ((!message || !message.id) && messageID) {
      throw createArgError("hubot-traq/request/sendStamp()", envelope)
    }

    const res = []
    for (const stamp of stamps) {
      if (!stamp.name) {
        throw createArgError("hubot-traq/request/sendStamp()", stamps)
      }
      const stampID = await this.stampNameToID(stamp.name)
      if (!stampID) {
        throw createArgError("hubot-traq/request/sendStamp()", stamps)
      }
      res.push(
        await this.api.stampMessage(
          messageID || message.id,
          stampID
        )
      )
    }
    return res
  }
  async stampNameToID(name) {
    const table = await this.stampIDTablePromise
    const stamp = table.find(v => v.name === name)
    return stamp ? stamp.id : null
  }

  replyMessage(envelope, ...strings) {
    const { user } = envelope
    if (!user) {
      throw createArgError("hubot-traq/request/replyMessage()", envelope)
    }
    const userMention = this.createUserString(user)
    const i = strings.findIndex(s => typeof s === "string")
    if (i === -1) {
      throw createArgError("hubot-traq/request/replyMessage()", strings)
    }
    strings[i] = `${userMention} ${strings[i]}`
    return this.sendMessage(envelope, ...strings)
  }
  createUserString(user) {
    return `!${JSON.stringify({
      type: "user",
      raw: `@${user.name}`,
      id: user.id
    })}`
  }

  setTopic(envelope, ...strings) {
    const { room, channelID } = envelope
    if (room && room.type !== "channel") {
      throw new Error("envelope.room.typeはchannelではありません")
    }
    if (!room && !channelID) {
      throw createArgError("hubot-traq/request/setTopic()", envelope)
    }

    return this.api.changeChannelTopic(channelID || room.id, {
      text: strings.join("\n")
    })
  }

  /*
    reaction送信用だがsendに実装
  */
  // emote(envelope, strings...) {}
}

module.exports = Request
