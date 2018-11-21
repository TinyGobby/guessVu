import React, { Component } from 'react';
import Form from './form';
import Home from './home';
import ChatRoom from './chatroom';
import socket from './index.js';
import './App.css';
import DisplayMessages from './displayMessages';
import styles from '../styles/app.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatErrorMsg: null,
      gameState: {
        open: true,
        maxWrongGuesses: null
      },
      user: null
    }
    this.setUser = this.setUser.bind(this);
    this.closeGame = this.closeGame.bind(this);
  }

  componentDidMount() {
    const that = this;
    socket.on('startGameClient', function(data) {
      if (data.success) {
        that.closeGame(data.maxWrongGuesses);
      } else {
        that.setState({
          chatErrorMsg: data.reason
        })
      }
    });

    socket.on('discoverClient', function(data){
      let user = that.state.user
      if (data.fakeName == user.fakeName) {
        user.discovered = true
        that.setState({ user: user })
      }
    })
  }

  closeGame(maxWrongGuesses) {
    let gameState = {
      open: false,
      maxWrongGuesses
    };
    this.setState({
      gameState
    })
  }

  setUser(user) {
    this.setState({
      user: user
    })
  }

  render() {
    // console.log(this.state);
    return (
      <Router>
        <div className={styles.container}>
          <Route exact path="/"
            render={() => <Home setUser={this.setUser} />}/>
          <Route path="/chatroom" render={() => <ChatRoom user={this.state.user} gameState={this.state.gameState} closeGame={this.closeGame} errorMsg={this.state.chatErrorMsg} setUser={this.setUser}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
