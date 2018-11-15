import React, { Component } from 'react';

class ResultOfGuess extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className="outcome">{this.props.guessOutcome}</h1>
      </div>
    );
  }
}

export default ResultOfGuess;
