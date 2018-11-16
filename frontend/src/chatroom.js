import React, { Component } from 'react';
import DisplayMessages from './displayMessages';
import socket from './index.js';
import ShowRealNames from './realNames';
import ShowFakeNames from './fakeNames';
import Guess from './guess';
import axios from 'axios';
import Leave from './leave';
import { throws } from 'assert';
import styles from '../styles/chatroom.css'

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: [],
      realNames: [],
      fakeNames: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRealNames = this.getRealNames.bind(this);
    this.getFakeNames = this.getFakeNames.bind(this);
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
    this.getRealNames();
    this.getFakeNames();

    socket.on('listOfMessages', function(data) {
      that.setState({
        messages: data
      });
    });

  }

  getRealNames() {
    let that = this;
    axios
      .get('/api/user/allRealNames', {})
      .then(function(response) {
        console.log(response.data);
        that.setState({ realNames: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getFakeNames() {
    let that = this;
    axios
      .get('/api/user/allFakeNames', {})
      .then(function(response) {
        console.log(response.data);
        that.setState({ fakeNames: response.data });
      })
      .catch(function(error) {
        console.log(error);
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
          <Guess guesser={this.props.user} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="message"
            className={styles.messageInput}
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button className={styles.button} type="submit">
            Submit!
          </button>
        </form>
        <div className="DisplayedMessages">
          <DisplayMessages messages={this.state.messages} />
        </div>

        <Leave user={this.props.user} />
      </div>
    );
  }
}

export default ChatRoom;
