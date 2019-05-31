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
    { room, channelID, userID } = envelope
    if (room) {
      switch (room.type) {
        case "channel":
          this.sendMessageToChannel(room.id, ...strings);
          break;
        case "dm":
          this.sendMessageToUser(room.id, ...strings);
          break;
        case "none":
          throw new Error("envelope.room.typeはnoneです");
      }
    }
    if (channelID) return this.sendMessageToChannel(channelID, ...strings);
    if (userID) return this.sendMessageToUser(userID, ...strings);
    throw new Error(
      "無効な引数が渡されました: hubot-traq/request/sendMessage(): " + JSON.stringify(envelope)
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
}

module.exports = Request;
