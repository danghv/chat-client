import feathers from '@feathersjs/client'
// import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'
import rest from '@feathersjs/rest-client'
import axios from 'axios'

const APIEndpointBaseURL = 'http://localhost:3030'

// const socket = io(APIEndpointBaseURL)

const app = feathers()

app.configure(rest(APIEndpointBaseURL).axios(axios))
// app.configure(feathers.socketio(socket))
    // .configure(feathers.authentication())
    .configure(auth({
        storage: window.localStorage
    }))

export default app