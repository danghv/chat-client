import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import feathers from '../api/feathers'

const handleSubmit = async (e, text, setText, setMessages) => {
  e.preventDefault()
  await feathers.rest.service('messages').create({ text })
  fetchAllMessages(setMessages)
  setText('')
}

async function fetchAllMessages(setMessages) {
  const messages = await feathers.rest.service('messages').find({
    query: {
      $sort: { createdAt: -1 },
      $limit: 100,
    }
  })
  setMessages(messages.data.reverse())
}

const Chat = () => {
  const [ text, setText ] = useState('')
  const [ messages, setMessages ] = useState([])

  useEffect(() => {
    fetchAllMessages(setMessages)
    feathers.socketio.service('messages').on('dang-event', data => console.log('data...', data))
  }, [])
  console.log('messages', messages)

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
            <ul>
              {
                messages.map(message => <li key={message._id}>{message.user.email}: {message.text}</li>)
              }
            </ul>
          </main>
          <form onSubmit={(e) => handleSubmit(e, text, setText, setMessages)}>
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
