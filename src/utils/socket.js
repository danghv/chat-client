import io from 'socket.io-client'

const BaseURL = 'http://localhost:3030'

export default {
    accessToken: null,
    socket: null,
    connectError: false,
    connect(actions) {
      this.accessToken = window.localStorage.getItem('feathers-jwt')
      const url = new URL(BaseURL)
      this.socket = io(url.origin, {
        path: `${url.pathname}/socket`,
        transports: ['websocket'],
      })
      this.socket.on('connect', (params) => {
        this.connectError = false
        console.log('connected...', params)
      })
    },
    sendMessage(message) {
      if (!this.socket) {
        return
      }
      this.socket.emit('sendMessage', {
        message,
        accessToken: this.accessToken
      })
    }
}