import React from 'react';
import { Container, Grid } from '@material-ui/core'
import client from './feathers';

export default class Chat extends React.Component {
    state = {
        text: '',
        messages: [],
    }

    componentDidMount() {
        this.fetchSomething()
    }
    fetchSomething = async () => {
        const result = await client.service('messages').find({
            query: {
                $sort: { createdAt: -1 },
                $limit: 25
            }
        })
        await this.setState({messages: result.data.reverse()})
    }
    submitMessage = async (e) => {
        e.preventDefault()
        const test = await client.service('messages').create({
            text: this.state.text,
        })
        this.setState({text: ''})
        console.log('test', test)
    }
    handleSubmit = async (e) => {
        const newMessage = await this.submitMessage(e)
        console.log('new message...', newMessage)
        await this.fetchSomething()
        await client.service('messages').on('created', this.fetchSomething)
    }

    render() {
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
                                this.state.messages.length > 0 &&
                                this.state.messages.map(message => (
                                    <li key={message._id}>{message.text}</li>
                                ))
                            }
                        </ul>
                        </main>
                        <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="text"
                            value={this.state.text}
                            onChange={(event) => this.setState({text: event.target.value})}
                        />
                            <button type="submit">Send</button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

