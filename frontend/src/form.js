import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Form extends Component {
  handleSubmit() {
    const fakeName = document.getElementById('fakeName').value;
    const realName = document.getElementById('realName').value;
    this.props.setNames(fakeName, realName);
    this.props.history.push('/chatroom');
  }

  render() {
    return (
      <div class="Form">
        <input name="fakeName" id="fakeName" placeholder="Fake Name" />
        <input name="realName" id="realName" placeholder="Real Name" />
        <button type="submit" onClick={() => this.handleSubmit()}>
          Play
        </button>
      </div>
    );
  }
}

export default withRouter(Form);
