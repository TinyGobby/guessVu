import React, { Component } from 'react';
import axios from 'axios';
import styles from '../styles/guess.css';
import socket from './index.js';

class Guess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guessResult: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    var that = this;
    const guessFakeName = document.getElementById('guessFakeName').value;
    const guessRealName = document.getElementById('guessRealName').value;

    axios
      .post('/api/user/solve', {
        guesser: that.props.guesser,
        solution: {
          fakeName: guessFakeName,
          realName: guessRealName
        }
      })
      .then(function(response) {
        console.log(response);
        if (response.data.success === true) {
          socket.emit('discoverServer', {fakeName: guessFakeName})
        }
        if (response.data.win) {
          socket.emit('winServer', {
            fakeName: response.data.winner.fakeName,
            realName: response.data.winner.realName
          });
        }
        if (response.data.eliminated) {
          that.props.hideGuessing();
        }
        that.props.setGuessResult(response.data.msg);
        socket.emit('usersLeftServer', response.data.usersLeft);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    console.log({"props in guess": this.props})
    return (
      <div className={styles.guesserDiv} id='guessing'>
        <div className="guessForm" id="guessForm">
          <input
            name="guessFakeName"
            className={styles.guessName}
            id="guessFakeName"
            placeholder="Fake Name"
          />
          <input
            name="guessRealName"
            className={styles.guessName}
            id="guessRealName"
            placeholder="Real Name"
          />
          <button
            className={styles.button}
            type="submit"
            id="guessSubmit"
            onClick={() => this.handleSubmit()}
          >
            Guess!
          </button>
        </div>
      </div>
    );
  }
}

export default Guess;
