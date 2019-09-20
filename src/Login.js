import React, { useState } from 'react'
import client from './feathers'

function updateField(name, event, payload, setPayload) {
  setPayload({ ...payload, [name]: event.target.value })
}

async function login(payload, setPayload) {
  const { email, password } = payload
  try {
    await client.authenticate({
      strategy: 'local',
      email, password
    })
  } catch(error){
    setPayload({ ...payload, error })
  }
}

async function signup(payload, setPayload) {
  const { email, password } = payload
  await client.service('users').create({ email, password })
  login(payload, setPayload)
}

const Login = () => {
  const [payload, setPayload] = useState({})

  return (
    <main className="login container">
      <div className="row">
        <div className="col-12 col-6-tablet push-3-tablet text-center heading">
          <h1 className="font-100">Log in or signup</h1>
          <p>{payload.error && payload.error.message}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop">
          <form className="form">
            <fieldset>
              <input className="block" type="email" name="email" placeholder="email" onChange={ev => updateField('email', ev, payload, setPayload)} />
            </fieldset>

            <fieldset>
              <input className="block" type="password" name="password" placeholder="password" onChange={ev => updateField('password', ev, payload, setPayload)} />
            </fieldset>

            <button type="button" className="button button-primary block signup" onClick={() => login(payload, setPayload)}>
              Log in
            </button>

            <button type="button" className="button button-primary block signup" onClick={() => signup(payload, setPayload)}>
              Signup
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login
