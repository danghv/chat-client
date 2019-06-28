import feathers from '@feathersjs/client';
import io from 'socket.io-client';

const socket = io('http://localhost:3030');

const client = feathers()
    .configure(feathers.socketio(socket))
    .configure(feathers.authentication());

export default client;