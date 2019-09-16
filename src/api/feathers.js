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
      break
    }
    case transports.socketio: {
      app.configure(feathers.socketio(io(BaseURL)))
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

export default {
  rest: client(transports.rest),
  socketio: client(transports.socketio)
}
