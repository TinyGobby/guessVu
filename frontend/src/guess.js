import React, { Component } from 'react';
import axios from 'axios';
import ResultOfGuess from './resultOfGuess';

class Guess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guessOutcome: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    var that = this;
    const guessFakeName = document.getElementById('guessFakeName').value;
    const guessRealName = document.getElementById('guessRealName').value;
    console.log('within guess');

    axios
      .post('/api/user/solve', {
        guesser: this.state.guesser,
        solution: {
          fakeName: guessFakeName,
          realName: guessRealName
        }
      })
      .then(function(response) {
        console.log('within response');
        if (response.data === 'true') {
          that.props.setState({ guessOutcome: 'You guessed correctly!' });
        } else if (response.data === 'false') {
          that.props.setState({ guessOutcome: 'Sorry, not this time!' });
        } else {
          console.log('No response');
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="guessing">
        <div className="guessForm">
          <input
            name="guessFakeName"
            id="guessFakeName"
            placeholder="Fake Name"
          />
          <input
            name="guessRealName"
            id="guessRealName"
            placeholder="Real Name"
          />
          <button
            className="submitGuess"
            type="submit"
            onClick={() => this.handleSubmit()}
          >
            Guess!
          </button>
        </div>
        <div className="resultOfGuess">
          <ResultOfGuess guessOutcome={this.state.guessOutcome} />
        </div>
      </div>
    );
  }
}

export default Guess;
