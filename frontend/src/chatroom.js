import React, { Component } from 'react';
import DisplayMessages from './displayMessages';
import socket from './index.js';
import ShowRealNames from './realNames';
import ShowFakeNames from './fakeNames';
import Guess from './guess';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: [],
      realNames: ['1', '2', '3'],
      fakeNames: ['a', 'b', 'c']
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  handleSubmit(e) {
    const that = this;
    let sentObj = {
      msg: this.state.input,
      fakeName: this.props.user.fakeName,
      userId: this.props.user.id
    };
    e.preventDefault();
    socket.emit('inputMessage', sentObj);
    this.setState({
      input: ''
    });
  }

  componentDidMount() {
    const that = this;
    // allows user to see updated version of message list
    // when joining room
    socket.emit('retrieveMessages');
    // socket.emit('getRealNames');
    // socket.emit('getFakeNames');

    socket.on('listOfMessages', function(data) {
      that.setState({
        messages: data
      });
    });

    socket.on('listOfRealNames', function(data) {
      that.setState({
        realNames: data
      });
    });

    socket.on('listOfFakeNames', function(data) {
      that.setState({
        fakeNames: data
      });
    });
  }

  render() {
    return (
      <div className="ChatRoom">
        <h1 className="ChatRoom-title">Welcome {this.props.user.fakeName}</h1>
        <div>
          <h3>Real Names</h3>
          <ShowRealNames realNames={this.state.realNames} />
        </div>
        <div>
          <h3>Fake Names</h3>
          <ShowFakeNames fakeNames={this.state.fakeNames} />
        </div>
        <div>
          <Guess guesser={this.state.user} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="message"
            className="MessageForm"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button className="submitMsg" type="submit">
            Submit!
          </button>
        </form>
        <div className="DisplayedMessages">
          <DisplayMessages messages={this.state.messages} />
        </div>
      </div>
    );
  }
}

export default ChatRoom;
