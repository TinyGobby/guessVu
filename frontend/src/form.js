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
      if (response.data.success) {
        const user = response.data.user;
        that.props.setUser(user);
        that.props.history.push('/chatroom');
      } else {
        console.log(response.data.reason);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div class="Form">
      <input name="fakeName" id="fakeName" placeholder="Fake Name" />
      <input name="realName" id="realName" placeholder="Real Name" />
      <button type="submit" onClick={() => handleSubmit()}>
        Play
      </button>
    </div>
  );
}

export default withRouter(Form);
