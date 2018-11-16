import React, { Component } from 'react';
import Form from './form';
import Home from './home';
import ChatRoom from './chatroom';
import socket from './index.js';
import './App.css';
import DisplayMessages from './displayMessages';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
    this.setUser = this.setUser.bind(this);
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
        <div className="App">
          <Route exact path="/"
            render={() => <Home setUser={this.setUser} />}/>
          <Route path="/chatroom" render={() => <ChatRoom user={this.state.user} />}/>
        </div>
      </Router>
    );
  }
}

export default App;
