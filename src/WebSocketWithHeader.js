import WebSocket from 'ws'

export const createWebSocketWithHeader = headers => {
  class WebSocketWithAuth extends WebSocket {
    constructor(url, protocols) {
      super(url, protocols, { headers })
    }
  }
  return WebSocketWithAuth
}
