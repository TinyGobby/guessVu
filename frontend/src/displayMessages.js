import React, { Component } from 'react';

class DisplayMessages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.messages.map(element => {
        return (
            <div>
            <ul>
                <li className="message">{element.message}</li>
                <li className="fakeName">{element.fakeName}</li>
            </ul>
            </div>
        );
        })}
      </div>
    );
  }
}

export default DisplayMessages;
