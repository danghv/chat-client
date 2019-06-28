import React, { useState } from 'react';
import Login from './Login';
import Chat from './Chat';
import './App.css';

function App() {
  const [ hidden, setHidden ] = useState(false);
  const [ user, setUser ] = useState({});
  return (
    <div className="App">
      {
        hidden ? <Chat user={user} /> : <Login hidden={hidden} setHidden={setHidden} user={user} setUser={setUser} />
      }
    </div>
  );
}

export default App;
