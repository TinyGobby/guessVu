import React, { Component } from 'react';
import Form from './form';
import styles from '../styles/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1 className="App-title">Guess Vu!</h1>
        <img src={require('../styles/my-logo.png')} alt="logo" />
        <Form setUser={this.props.setUser}/>
      </div>
    );
  }
}

export default Home;
