import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import client from './feathers'

async function sendMessage(e, text, setText) {
  e.preventDefault()
  await client.service('messages').create({ text })
  setText('')
}

function scrollToBottom(chat) {
  console.log('chat...', chat)
  // chat.scrollTop = chat.scrollHeight - chat.clientHeight
}

const Chat = ({messages, users}) => {
  const [text, setText] = useState('')

  return (
    <main className="flex flex-column">
      <header className="title-bar flex flex-row flex-center">
        <div className="title-wrapper block center-element">
          <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png"
            alt="Feathers Logo" />
          <span className="title">Chat</span>
        </div>
      </header>

      <div className="flex flex-row flex-1 clear">
        <aside className="sidebar col col-3 flex flex-column flex-space-between">
          <header className="flex flex-row flex-center">
            <h4 className="font-300 text-center">
              <span className="font-600 online-count">{users.length}</span> users
            </h4>
          </header>

          <ul className="flex flex-column flex-1 list-unstyled user-list">
            {users.map(user => <li key={user._id}>
              <a className="block relative" href="#">
                <img src={user.avatar} alt={user.email} className="avatar" />
                <span>{user.email}</span>
              </a>
            </li>)}
          </ul>
          <footer className="flex flex-row flex-center">
            <a href="#" onClick={() => client.logout()} className="button button-primary">
              Sign Out
            </a>
          </footer>
        </aside>

        <div>
          <main>
            {messages.map(message => <div key={message._id}>
              <img src={message.user.avatar} alt={message.user.email} className="avatar" />
              <div className="message-wrapper">
                <p className="message-header">
                  <span className="username font-600">{message.user.email}</span>
                  <span className="sent-date font-300">{moment(message.createdAt).format('MMM Do, hh:mm:ss')}</span>
                </p>
                <p className="message-content font-300">{message.text}</p>
              </div>
            </div>)}
          </main>

          <form onSubmit={(e) => sendMessage(e, text, setText)}>
            <input type="text" name="text" value={text} onChange={(e) => setText(e.target.value)}/>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Chat