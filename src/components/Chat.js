import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import app from '../api/feathers'

const handleSubmit = async (e, text, setText) => {
  e.preventDefault()
  const message = await app.service('messages').create({ text })
  console.log('message', message)
  setText('')
}

const Chat = () => {
  const [ text, setText ] = useState('')
  const [ messages, setMessages ] = useState([])

  useEffect(() => {
    async function fetchAllMessages() {
      const messages = await app.service('messages').find({})
      console.log('messages...', messages)
      setMessages(messages.reverse())
    }
    fetchAllMessages()
    app.service('messages').on('created', data => {
      console.log('data...', data)
    })
  }, [])

  return (
    <Container>
      <header>
        <div>
          <img src="http://feathersjs.com/img/feathers-logo-wide.png" alt="Feathers Logo" />
          <span>Chat</span>
        </div>
      </header>
      <Grid container>
        <Grid item xs={4}>
          <header>
            <h4>
              <span>0</span> users
            </h4>
          </header>
          <ul>
          </ul>
          <footer>
            <a href="/#">Sign Out</a>
          </footer>
        </Grid>
        <Grid item xs={8}>
          <main>
            <ul>{messages.map(message => <li key={message.id}>{message.text}</li>)}</ul>
          </main>
          <form onSubmit={(e) => handleSubmit(e, text, setText)}>
            <input
              type="text"
              name="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Chat
