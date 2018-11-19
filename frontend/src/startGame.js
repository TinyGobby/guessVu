import React from 'react';
import styles from '../styles/leave.css'

const StartGame = (props) => {
  return(
    <button className={styles.button} onClick={() => props.startGame()}>Start Game</button>
  )
}

export default StartGame;
