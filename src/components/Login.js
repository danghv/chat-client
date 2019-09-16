import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core'
import feathers from '../api/feathers'

const loginAction = async (email, password, user, callback) => {
        const accessToken = window.localStorage.getItem('feathers-jwt')
        if (accessToken) {
            console.log(accessToken)
            callback({ ...user, email })
        } else {
            const payload = { email, password, strategy: 'local' };
            const loginUser = await feathers.rest.authenticate(payload)
            const loginUserSocket = await feathers.socketio.authenticate()
            console.log('loginUser', loginUser, loginUserSocket)
            return loginUser
        }
        
    }
const signupAction = async (email, password) => {
        const signupUser = await feathers.rest.service('users').create({ email, password })
        console.log('signupUser', signupUser);
    }

export default function Login(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { setHidden } = props;
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <h1>Log in or signup</h1>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                        onClick={async () => await loginAction(email, password, props.user, props.setUser)}
                    >
                        Log in
                    </button>
                    <button
                        onClick={async () => {
                            await signupAction(email, password);
                            const loginedUser = await loginAction(email, password);
                            props.setUser(loginedUser)
                            setHidden(true)
                        }}
                    >
                        Sign up and log in
                    </button>
                </Grid>
            </Grid>
        </Container>
    );
}

