const BASE_URL = "https://q.trap.jp/api";

class Request {
  constructor(token, robot) {
    this.token = token;
    this.robot = robot;
  }

  get(url) {
    return new Promise((resolve, reject) => {
      this.robot
        .http(`${BASE_URL}${url}`)
        .header("Content-Type", "application/json")
        .header("Authorization", `Bearer ${this.token}`)
        .get((err, res, body) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res, body);
        });
    });
  }
  post(url, data) {
    return new Promise((resolve, reject) => {
      this.robot
        .http(`${BASE_URL}${url}`)
        .header("Content-Type", "application/json")
        .header("Authorization", `Bearer ${this.token}`)
        .post(JSON.stringify(data), (err, res, body) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res, body);
        });
    });
  }
}

module.exports = Request;
