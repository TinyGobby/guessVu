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
    const fakeNameSelector = document.getElementById('guessFakeName');
    const guessFakeName =
      fakeNameSelector.options[fakeNameSelector.selectedIndex].value;
    console.log(guessFakeName);

    const realNameSelector = document.getElementById('guessRealName');
    const guessRealName =
      realNameSelector.options[realNameSelector.selectedIndex].value;

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
          socket.emit('discoverServer', { fakeName: guessFakeName });
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
    console.log({ 'props in guess': this.props });
    return (
      <div className={styles.guesserDiv} id="guessing">
        <div className="guessForm" id="guessForm">
          <select className={styles.guessName} id="guessFakeName">
            {this.props.fakeNames.map(fakeName => (
              <option value={fakeName}>{fakeName}</option>
            ))}
          </select>
          <select className={styles.guessName} id="guessRealName">
            {this.props.realNames.map(realName => (
              <option value={realName}>{realName}</option>
            ))}
          </select>

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
