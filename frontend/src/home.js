import React, { Component } from 'react';
import Form from './form';
import styles from '../styles/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.homepage}>
        <img className={styles.image} src={require('../public/my-logo-stark.png')} alt="logo" />
        <h1 className="App-title">Guess Vu</h1>
        <Form setUser={this.props.setUser} />
      </div>
    );
  }
}

export default Home;
