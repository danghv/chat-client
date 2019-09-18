import React, { useState } from 'react'
import Login from './Login'
import Chat from './Chat'

function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ user, setUser ] = useState({})
  const [ messages, ] = useState([])
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
