import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Form extends Component {
  
  handleSubmit() {
    var that = this;
    const fakeName = document.getElementById('fakeName').value;
    const realName = document.getElementById('realName').value;

    axios.post('/api/user', {
      fakeName: fakeName,
      realName: realName
    })
    .then(function (response) {
      const user = response.data;
      that.props.setUser(user);
      that.props.history.push('/chatroom');
    })
    .catch(function (error) {
      console.log(error);
    });
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
