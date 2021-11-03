const { Adapter } = require("hubot/es2015")
const ReconnectingWebSocket = require('reconnecting-websocket')
const { createWebSocketWithHeader } = require('./WebSocketWithHeader')
const Request = require("./request")
const Handler = require("./handler")

class TraQAdapter extends Adapter {
  constructor(robot, { mode, verifyToken, accessToken, path, embed = false, domain }) {
    super(robot)
    this.robot = robot

    this.mode = mode
    this.path = path
    this.accessToken = accessToken
    this.domain = domain

    this.request = new Request(accessToken, robot, domain, embed)
    this.handler = new Handler(verifyToken, this.request)

    this.robot.logger.info("Constructor")
  }

  run() {
    this.robot.logger.info("Run")

    // イベント受信
    if (this.mode === 'HTTP') {
      this.robot.router.post(this.path, (req, res) => {
        this.robot.logger.debug("Recieved Request")

        try {
          const event = this.handler.parseHTTPRequest(req)
          if (event) {
            this.robot.receive(event.data)
          }

          res.status(204).end()
        } catch (e) {
          this.robot.logger.debug(`Error with request data: ${e}`)
          res.status(403).end()
        }
      })

      this.robot.on('send-rtcstate', () => {
        this.robot.logger.debug('Cannot use rtcstate command with HTTP mode.')
      })

    } else if (this.mode === 'WEBSOCKET') {
      const WebSocketWithAuth = createWebSocketWithHeader({
        Authorization: `Bearer ${this.accessToken}`
      })
      const ws = new ReconnectingWebSocket(
        `wss://${this.domain}/api/v3/bots/ws`,
        [],
        { WebSocket: WebSocketWithAuth }
      )
      ws.addEventListener('message', eve => {
        try {
          const data = JSON.parse(eve.data)
          if (data.type === 'ERROR') {
            console.error(`Error from traQ server: ${data.body}`)
            return
          }

          const event = this.handler.parse(data.type, data.body)
          if (event) {
            this.robot.receive(event.data)
          }
        } catch (e) {
          this.robot.logger.debug(`Error with request data: ${e}`)
        }
      })

      this.robot.on('send-rtcstate', eve => {
        const statesText = Object.entries(eve.states).map(([sessionId, state]) => `${state}:${sessionId}`).join(':')
        const commandText = `rtcstate:${eve.channelId}:${statesText}`
        ws.send(commandText)
      })
    }

    this.emit("connected")
  }

  // ここから送信
  async send(envelope, ...strings) {
    this.robot.logger.info("Send")
    await this.request.sendMessage(envelope, ...strings)
    this.robot.logger.debug("Sent")
  }

  async reply(envelope, ...strings) {
    this.robot.logger.info("Reply")
    await this.request.replyMessage(envelope, ...strings)
    this.robot.logger.debug("Reply")
  }

  async topic(envelope, ...strings) {
    this.robot.logger.info("Topic")
    await this.request.setTopic(envelope, ...strings)
    this.robot.logger.debug("Topic")
  }
}

module.exports = TraQAdapter
