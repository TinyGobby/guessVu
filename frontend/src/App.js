import React, { Component } from 'react';
import Form from './form';
import Home from './home';
import ChatRoom from './chatroom'
import './App.css';
import socket from './index';
import DisplayMessages from './displayMessages';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeName: null,
      realName: null,
    }
    this.setNames = this.setNames.bind(this);
  }

  setNames(fakeName, realName) {
    this.setState({
      fakeName: fakeName,
      realName: realName
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/"
            render={() => <Home setNames={this.setNames} />}/>
          <Route path="/chatroom" render={() => <ChatRoom fakeName={this.state.fakeName} />}/>
        </div>
      </Router>
    );
  }
}

export default App;
