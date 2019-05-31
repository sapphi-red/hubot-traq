const request = require("request-promise-native");

const BASE_URL = "https://q.trap.jp/api/1.0";

class Request {
  constructor(token, robot) {
    this.token = token;
    this.robot = robot;
  }

  get(url) {
    return request({
      url,
      baseUrl: BASE_URL,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    });
  }
  post(url, data) {
    return request({
      url,
      baseUrl: BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      },
      body: data,
      json: true
    });
  }
  put(url, data) {
    return request({
      url,
      baseUrl: BASE_URL,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      },
      body: data,
      json: true
    });
  }
  sendMessage(envelope, ...strings) {
    const texts = [];
    const stamps = [];
    for (const string of strings) {
      if (typeof string === "string") {
        texts.push(string);
        continue;
      }
      if (string.type === "stamp") {
        stamps.push(string);
      }
    }

    return Promise.all([
      this.sendTextMessage(envelope, ...texts),
      this.sendStamp(envelope, ...stamps)
    ]);
  }
  sendTextMessage(envelope, ...strings) {
    const { room, channelID, userID } = envelope;

    if (room && room.type === "none") {
      throw new Error("envelope.room.typeはnoneです");
    }

    if ((room && room.type === "channel") || channelID) {
      const id = channelID || room.id;
      return this.sendMessageToChannel(id, ...strings);
    }

    if ((room && room.type === "dm") || userID) {
      const id = userID || room.id;
      return this.sendMessageToUser(id, ...strings);
    }

    throw new Error(
      `無効な引数が渡されました: hubot-traq/request/sendTextMessage(): ${JSON.stringify(
        envelope
      )}`
    );
  }
  sendMessageToChannel(channelID, ...strings) {
    return this.post(`/channels/${channelID}/messages`, {
      text: strings.join("\n")
    });
  }
  sendMessageToUser(userID, ...strings) {
    return this.post(`/users/${userID}/messages`, {
      text: strings.join("\n")
    });
  }
  sendStamp(envelope, ...stamps) {
    const { message, messageID } = envelope;
    if ((!message || !message.id) && messageID) {
      throw new Error(
        `無効な引数が渡されました: hubot-traq/request/sendStamp(): ${JSON.stringify(
          envelope
        )}`
      );
    }
    return Promise.all(
      stamps.map(stamp => {
        if (!stamp.id) {
          throw new Error(
            `無効な引数が渡されました: hubot-traq/request/sendStamp(): ${JSON.stringify(
              stamps
            )}`
          );
        }
        return this.post(
          `/messages/${messageID || message.id}/stamps/${stamp.id}`,
          {}
        );
      })
    );
  }

  replyMessage(envelope, ...strings) {
    const { user } = envelope;
    if (!user) {
      throw new Error(
        `無効な引数が渡されました: hubot-traq/request/replyMessage(): ${JSON.stringify(
          envelope
        )}`
      );
    }
    const userMention = this.createUserString(user);
    const i = string.findIndex(s => typeof s === "string");
    if (i === -1) {
      throw new Error(
        `無効な引数が渡されました: hubot-traq/request/replyMessage(): ${JSON.stringify(
          strings
        )}`
      );
    }
    strings[i] = `${userMention} ${strings[i]}`;
    return this.sendMessage(envelope, ...strings);
  }
  createUserString(user) {
    return `!${JSON.stringify({
      type: "user",
      raw: `@${user.name}`,
      id: user.id
    })}`;
  }

  setTopic(envelope, ...strings) {
    const { room, channelID, userID } = envelope;
    if (room && room.type !== "channel") {
      throw new Error("envelope.room.typeはchannelではありません");
    }
    if (!room && !channelID) {
      throw new Error(
        `無効な引数が渡されました: hubot-traq/request/setTopic(): ${JSON.stringify(
          envelope
        )}`
      );
    }

    return this.put(`/channels/${channelID || room.id}/topic`, {
      text: strings.join("\n")
    });
  }

  /*
    reaction送信用だがsendに実装
  */
  // emote(envelope, strings...) {}
}

module.exports = Request;
