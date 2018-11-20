import React, { Component } from 'react';
import style from '../styles/GameWon.css'

class Discovered extends Component {
    constructor(props) {
      super(props);
      };
      render() {
          return (
                <h2 class={style.title}>You have been discovered</h2>
        )
    }
}

export default Discovered;
