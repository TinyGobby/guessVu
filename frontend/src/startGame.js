import React from 'react';

const StartGame = (props) => {
  return(
    <button onClick={() => props.startGame()}>Start Game</button>
  )
}

export default StartGame;
