import feathers from '@feathersjs/client'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'
import rest from '@feathersjs/rest-client'
import socketio from '@feathersjs/socketio-client';
import axios from 'axios'

const transports = { rest: 'rest', socketio: 'socketio' }
const BaseURL = 'http://localhost:3030'

const client = (transport) => {
  const app = feathers()
  switch (transport) {
    case transports.rest: {
      app.configure(rest(BaseURL).axios(axios))
      app.service('messages').create({
        text: 'A message from a REST client'
      });
      break
    }
    case transports.socketio: {
      app.configure(socketio(io(BaseURL)))
      app.service('messages').on('created', message => console.log('new message...', message))
      break;
    }
    default: {
      throw new Error(`Unknown transport: ', ${transport}`)
    }
  }
  app.configure(auth({
        storage: window.localStorage,
      }))
  return app
}

// client(transports.socketio).service('messages').on('created', message => {
//   console.log('some one created a new message')
// })
// client(transports.socketio).service('messages').on('test-socket', data => {
//   console.log('new data...', data)
// })


export default {
  rest: client(transports.rest),
  socketio: client(transports.socketio)
}
