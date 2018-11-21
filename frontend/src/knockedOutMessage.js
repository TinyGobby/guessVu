import React, { Component } from 'react';
import style from '../styles/GameWon.css';

class KnockedOutMessage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h2 class={style.title}>{this.props.message}</h2>;
  }
}

export default KnockedOutMessage;
