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
      this.robot.logger.debug("Recieved Request");

      try {
        const event = this.handler.parse(req);
        if (event) {
          this.robot.receive(event.data);
        }

        res.status(204).end();
      } catch (e) {
        this.robot.logger.debug(`Error with request data: ${e}`);
        res.status(403).end();
      }
    });

    this.emit("connected");
  }

  // ここから送信
  async send(envelope, ...strings) {
    this.robot.logger.info("Send");
    await this.request.sendMessage(envelope, ...strings);
    this.robot.logger.debug("Sent");
  }

  async reply(envelope, ...strings) {
    this.robot.logger.info("Reply");
    await this.request.replyMessage(envelope, ...strings);
    this.robot.logger.debug("Reply");
  }
}

module.exports = TraQAdapter;
