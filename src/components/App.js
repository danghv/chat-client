import React, { useState, useEffect } from 'react'

import app from '../api/feathers'
import Login from './Login'
import Chat from './Chat'

const fetchSomething = async () => {
  const result = await app.service('messages').find({
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
  // useEffect(() => {
  //   async function fetchUserInfo() {
  //     const userInfo = await app.authenticate({
  //       strategy: 'local',
  //       email: user.email,
  //       password: user.password,
  //     })
  //     console.log('userInfo', userInfo)
  //   }
  //   fetchUserInfo()
  // }, [])
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
