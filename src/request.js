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
  sendMessage(envelope, ...strings) {
    const { room, channelID, userID } = envelope;
    if (room) {
      switch (room.type) {
        case "channel":
          return this.sendMessageToChannel(room.id, ...strings);
        case "dm":
          return this.sendMessageToUser(room.id, ...strings);
        case "none":
          throw new Error("envelope.room.typeはnoneです");
      }
    }
    if (channelID) return this.sendMessageToChannel(channelID, ...strings);
    if (userID) return this.sendMessageToUser(userID, ...strings);
    throw new Error(
      `無効な引数が渡されました: hubot-traq/request/sendMessage(): ${JSON.stringify(
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
    strings[0] = `${userMention} ${strings[0]}`;
    return this.sendMessage(envelope, ...strings);
  }
  createUserString(user) {
    return `!${JSON.stringify({
      type: "user",
      raw: `@${user.name}`,
      id: user.id
    })}`;
  }
}

module.exports = Request;
