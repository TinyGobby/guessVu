import React, { Component } from 'react';
import Form from './form';

class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="App-title">Guess Vu!</h1>
        <Form />
      </div>
    );
  }
}

export default Home;
