import React, { Component } from 'react';
import Form from './form';
import Home from './home';
import ChatRoom from './chatroom'
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/chatroom" component={ChatRoom} />
        </div>
      </Router>
    );
  }
}

export default App;
