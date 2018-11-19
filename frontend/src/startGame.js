import React from 'react';

const StartGame = (props) => {
  return(
    <button className="startGame" onClick={() => props.startGame()}>Start Game</button>
  )
}

export default StartGame;
