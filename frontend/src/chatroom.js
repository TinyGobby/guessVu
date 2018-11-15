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
    const that = this;
    // allows user to see updated version of message list
    // when joining room
    socket.emit('retrieveMessages')

    socket.on('listOfMessages', function (data) {
      that.setState({
        messages: data
      })
    })
  }

render() {
  return (
        <div className="ChatRoom">
          <h1 className="ChatRoom-title">Welcome {this.props.user.fakeName}</h1>
          <form onSubmit={this.handleSubmit}>
            <input name="message" className="MessageForm" value={this.state.input} onChange={this.handleChange} />
            <button type='submit'>Submit!</button>
          </form>
          <div className="DisplayedMessages">
            <DisplayMessages messages={this.state.messages} />
          </div>
        </div>
  )
  }
}

export default ChatRoom;
