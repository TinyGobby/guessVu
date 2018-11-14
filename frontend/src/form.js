import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const Form = (props) => { 
  const handleSubmit = () => {
    const fakeName = document.getElementById('fakeName').value;
    const realName = document.getElementById('realName').value;
    props.setNames(fakeName, realName);
    props.history.push('/chatroom');
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
