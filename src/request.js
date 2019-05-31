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
}

module.exports = Request;
