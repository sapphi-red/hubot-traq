const WebSocket = require('ws')

exports.createWebSocketWithHeader = headers => {
  class WebSocketWithAuth extends WebSocket {
    constructor(url, protocols) {
      super(url, protocols, { headers })
    }
  }
  return WebSocketWithAuth
}
