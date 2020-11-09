const { Apis } = require("@traptitech/traq")

const createArgError = (path, obj) => {
  return new Error(`無効な引数が渡されました: ${path}: ${JSON.stringify(obj)}`)
}

class Request {
  constructor(token, robot, embed) {
    this.token = token
    this.robot = robot
    this.embed = embed

    this.api = new Apis({
      accessToken: this.token
    })

    /*
      本来ならpromiseを変数に持つべきだが、
      hubotが同期関数しか許さない箇所があるので、
      仕方なく実体を代入する
    */
    this.stampIDTable = []
    this.api.getStamps().then(({ data }) => {
      this.stampIDTable = data
    })
  }

  async sendMessage(envelope, ...strings) {
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
    try {
      await Promise.all(promises)
    } catch (e) {
      console.error(`[hubot-traq] Error: ${e}`)
    }
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
    return this.api.postMessage(
      channelID,
      {
        content: strings.join("\n"),
        embed: this.embed
      }
    )
  }
  sendMessageToUser(userID, ...strings) {
    return this.api.postDirectMessage(
      userID,
      {
        content: strings.join("\n"),
        embed: this.embed
      }
    )
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
      const stampID = this.stampNameToID(stamp.name)
      if (!stampID) {
        throw createArgError("hubot-traq/request/sendStamp()", stamps)
      }
      res.push(
        await this.api.addMessageStamp(messageID || message.id, stampID, {
          count: stamp.count !== void 0 ? stamp.count : 1
        })
      )
    }
    return res
  }

  stampNameToID(name) {
    const stamp = this.stampIDTable.find(v => v.name === name)
    return stamp ? stamp.id : null
  }
  stampIDToName(id) {
    const stamp = this.stampIDTable.find(v => v.id === id)
    return stamp ? stamp.name : null
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
    if (this.embed) {
      return `@${user.name}`
    }
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

    return this.api.editChannelTopic(channelID || room.id, {
      topic: strings.join("\n")
    })
  }

  /*
    reaction送信用だがsendに実装
  */
  // emote(envelope, strings...) {}
}

module.exports = Request
