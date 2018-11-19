import React, { Component } from 'react';
import styles from '../styles/displayMessages.css';

class DisplayMessages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.messages.map(element => {
          return (
            <div className={styles.msgDiv}>
              <ul className={styles.msgUl}>
                <li className={styles.msgFakeName}>{element.fakeName}</li>
                <li className={styles.msgText}>{element.message}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default DisplayMessages;
