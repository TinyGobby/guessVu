import React, { Component } from 'react';

class ChatRoom extends Component {
  render() {
    return (
      <div className="ChatRoom">
        <h1 className="ChatRoom-title">Welcome {this.props.fakeName}</h1>
      </div>
    );
  }
}

export default ChatRoom;
