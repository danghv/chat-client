import React, { useState, useEffect } from 'react'
import feathers from '../api/feathers'

import Login from './Login'
import Chat from './Chat'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const messages = feathers.socketio.service('messages')
    const users = feathers.socketio.service('users')
  }, [])

  return (
    isAuthenticated ?
      <Chat users={users} messages={messages} /> :
      <Login
        hidden={isAuthenticated}
        setHidden={setIsAuthenticated}
        user={users}
        setUsers={setUsers}
      />
  );
}

export default App;
