const { Adapter } = require("hubot");
const Handler = require("./handler");

class TraQAdaper extends Adapter {
  constructor(robot, { id, token, path }) {
    super(robot);
    this.robot = robot;

    this.id = id;
    this.token = token;
    this.path = path;

    this.handler = new Handler(token);

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
  send(envelope, ...strings) {
    this.robot.logger.info("Send");
  }

  reply(envelope, ...strings) {
    this.robot.logger.info("Send");
  }
}

module.exports = TraQAdapter;
