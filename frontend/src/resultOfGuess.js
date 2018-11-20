import React from 'react';
import style from '../styles/guess.css'

const ResultOfGuess = (props) => {
  if (props.guessResult == null) {
    return null
  } else {
    return (
      <div>
        <div className={style.result} id="guessResult">{props.guessResult}</div>
      </div>
    );
  }
}

export default ResultOfGuess;
