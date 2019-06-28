import React from 'react';
import client from './feathers';

export default class Test extends React.Component {

    state = {
        data: []
    }
    async componentDidMount() {
        const xx = await this.fetchSomething()
        console.log('xx', xx)
        this.setState({data: xx.data})
    }
    fetchSomething = () => client.service('messages').find()

    render() {
        return (
            <h1>{this.state.data.length > 0 && this.state.data[0].text}</h1>
        );
    }
}

