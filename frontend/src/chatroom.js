import React, { Component } from 'react';
import DisplayMessages from './displayMessages';
import socket from './index.js';
import ShowRealNames from './realNames';
import ShowFakeNames from './fakeNames';
import StartGame from './startGame';
import Guess from './guess';
import axios from 'axios';
import Leave from './leave';
import { throws } from 'assert';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      gameOpen: true,
      messages: [],
      realNames: [],
      fakeNames: [],
      numberOfUsers: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentWillReceiveProps(props, nextProps) {
    console.log('will receive props')
    console.log(props);
    console.log(nextProps);
    if (props.gameOpen !== nextProps.gameOpen) {
      this.setState({
        gameOpen: nextProps.gameOpen
      })
    }
  }

  componentDidMount() {
    const that = this;
    // allows user to see updated version of message list
    // when joining room
    socket.emit('retrieveMessages');

    socket.on('listOfMessages', function(data) {
      that.setState({
        messages: data
      });
    });

    socket.on('listOfUsers', function(data) {
      that.setState({ realNames: data.allRealNames });
      that.setState({ fakeNames: data.allFakeNames });
      that.setState({ numberOfUsers: data.allFakeNames.length})
    });

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

  startGame() {
    socket.emit('startGameServer');
  }

  render() {
    return (
      <div className="ChatRoom">
        <h1 className="ChatRoom-title">Welcome {this.props.user.fakeName}</h1>
        <div className="numberOfUsers">Number of players: {this.state.numberOfUsers}</div>
        <StartGame startGame={this.startGame} />
        { !this.state.gameOpen && (
          <div className="Names">
            <div>
              <h3>Real Names</h3>
              <ShowRealNames realNames={this.state.realNames} />
            </div>
            <div>
              <h3>Fake Names</h3>
              <ShowFakeNames fakeNames={this.state.fakeNames} />
            </div>
          </div>
        )}
        <div>
          <Guess guesser={this.props.user} />
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

        <Leave user={this.props.user}/>
      </div>
    );
  }
}

export default ChatRoom;
