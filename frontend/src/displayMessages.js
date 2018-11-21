import React, { Component } from 'react';
import styles from '../styles/displayMessages.css';

class DisplayMessages extends Component {
  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom(){
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  componentDidMount() {
    // this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
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
        <div ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    );
  }
}

export default DisplayMessages;
