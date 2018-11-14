import React, { Component } from 'react';
import DisplayMessages from './displayMessages'
import socket from './index.js';

class ChatRoom extends Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      messages: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({ input: e.target.value })
  }

  handleSubmit(e){
    const that = this;
    e.preventDefault();
    socket.emit('inputMessage', that.state.input);
    this.setState({
      input: ''
    })
  }

  componentDidMount() {
    socket.on('reply', function (data) {
      console.log(data);
    })
    socket.emit('blabla', 'Hello World from client');
    const that = this;
    socket.on('listOfMessages', function (data) {
      that.setState({
        messages: data
      })
    })
  }

render() {
  return (
        <div className="ChatRoom">
          <h1 className="ChatRoom-title">Welcome {this.props.fakeName}</h1>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.input} onChange={this.handleChange} />
            <button type='submit'>Submit!</button>
          </form>
          <div>
            <DisplayMessages messages={this.state.messages} />
          </div>
        </div>
  )
  }
}

export default ChatRoom;
