import React, { useState, useEffect } from 'react'

import feathers from '../api/feathers'
import Login from './Login'
import Chat from './Chat'

const fetchSomething = async () => {
  const result = await feathers.rest.service('messages').find({
      query: {
          $sort: { createdAt: -1 },
          $limit: 25
      }
  })
  console.log('result...', result)
  // await this.setState({messages: result.data.reverse()})
}

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ user, setUser ] = useState({})
  const [ messages, setMessages ] = useState([])
  return (
    <div>
      {
        user && user.accessToken ?
          <Chat user={user} messages={messages} /> :
          <Login
            hidden={isAuthenticated}
            setHidden={setIsAuthenticated}
            user={user}
            setUser={setUser}
          />
      }
    </div>
  );
}

export default App;
