const { Adapter } = require("hubot/es2015");
const Request = require("./request");
const Handler = require("./handler");

class TraQAdapter extends Adapter {
  constructor(robot, { id, verifyToken, accessToken, path }) {
    super(robot);
    this.robot = robot;

    this.id = id;
    this.path = path;

    this.request = new Request(accessToken, robot);
    this.handler = new Handler(verifyToken);

    this.robot.logger.info("Constructor");
  }

  run() {
    this.robot.logger.info("Run");

    // イベント受信
    this.robot.router.post(this.path, (req, res) => {
      res.send("OK");
      this.robot.logger.debug("Recieved Request");

      try {
        const { data } = this.handler.parse(req);
        this.robot.receive(data);
      } catch (e) {
        this.robot.logger.debug(`Error with request data: ${e}`);
      }
    });

    this.emit("connected");
  }

  // ここから送信
  async send(envelope, ...strings) {
    this.robot.logger.info("Send");

    if (envelope.channelID) {
      await this.request.post(`/channels/${envelope.channelID}/messages`, {
        text: strings.join("\n")
      });
    } else if (envelope.userID) {
      await this.request.post(`/users/${envelope.userID}/messages`, {
        text: strings.join("\n")
      });
    } else {
      throw new Error("不明なsend()です");
    }
    this.robot.logger.debug("Sent");
  }

  reply(envelope, ...strings) {
    this.robot.logger.info("Send");
  }
}

module.exports = TraQAdapter;
