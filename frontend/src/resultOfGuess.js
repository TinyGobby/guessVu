import React, { Component } from 'react';
import style from '../styles/guess.css'

class ResultOfGuess extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={style.result} id="guessResult">{this.props.guessResult}</div>
      </div>
    );
  }
}

export default ResultOfGuess;
