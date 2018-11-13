import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Form extends Component {
  handleSubmit() {
    this.props.history.push('/chatroom');
  }

  render() {

  return(
    <div class="Form">
      <input name="fakeName"></input>
      <button type="submit" onClick={() => this.handleSubmit()}>Play</button>
    </div>
  )
}

}

export default withRouter(Form);
