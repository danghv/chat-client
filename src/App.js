import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Login from './Login'
import Chat from './Chat'
import client from './feathers'

const Application = () => {
  const [appState, setAppState] = useState({ messages: [], users: [] })

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const messages = client.service('messages')
    const users = client.service('users')

    client.on('authenticated', login => {
      Promise.all([
        messages.find({
          query: {
            $sort: { createdAt: -1 },
            $limit: 25
          }
        }),
        users.find()
      ]).then(([messagePage, userPage]) => {
        const messages = messagePage.data.reverse()
        const users = userPage.data
        setAppState({ login, messages, users })
      })
    })

    messages.on('created', message => setAppState({ ...appState, messages: appState.messages.concat(message) }))

    users.on('created', user => setAppState({ ...appState, users: appState.users.concat(user) }))

    client.on('logout', () => setAppState({ login: null, messages: null, users: null }))

    return () => {
      source.cancel()
    }
  }, [appState])

  if (appState.login === 'undefined') {
    return <main className="container text-center">
      <h1>Loading...</h1>
    </main>
  } else if (appState.login) {
    return <Chat messages={appState.messages} users={appState.users} />
  }
  return <Login />
}

export default Application