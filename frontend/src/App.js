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
      user: null,
      gameOpen: true
    }
    this.setUser = this.setUser.bind(this);
    this.closeGame = this.closeGame.bind(this);
  }

  componentDidMount() {
    const that = this;
    socket.on('startGameClient', function(data) {
      console.log('received start game');
      that.closeGame();
    });
  }

  closeGame() {
    this.setState({
      gameOpen: false
    })
  }

  setUser(user) {
    this.setState({
      user: user
    })
  }

  render() {
    console.log(this.state.user);
    return (
      <Router>
        <div className={styles.container}>
          <Route exact path="/"
            render={() => <Home setUser={this.setUser} />}/>
          <Route path="/chatroom" render={() => <ChatRoom user={this.state.user} gameOpen={this.state.gameOpen} closeGame={this.closeGame} />}/>
        </div>
      </Router>
    );
  }
}

export default App;
