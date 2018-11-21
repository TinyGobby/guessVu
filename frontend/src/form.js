import React, { Component } from 'react';
import Alert from './alert';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import styles from '../styles/form.css';

import socket from './index';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupErrorMsg: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    var that = this;
    const fakeName = document.getElementById('fakeName').value;
    const realName = document.getElementById('realName').value;
    if (fakeName.length == 0 || realName.length == 0) {
      that.setState({
        signupErrorMsg: "You cannot enter empty names"
      })
    } else {
      axios.post('/api/user', {
        fakeName: fakeName,
        realName: realName
      })
      .then(function (response) {
        if (response.data.success) {
          const user = response.data.user;
          that.props.setUser(user);
          socket.emit('retrieveUsers');
          that.props.history.push('/chatroom');
        } else {
          that.setState({
            signupErrorMsg: response.data.reason
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    return (
      <form
        className={styles.form}
        id="Form"
        onSubmit={e => this.handleSubmit(e)}
      >
        <input
          name="fakeName"
          className={styles.name}
          id="fakeName"
          placeholder="Fake Name"
        />
        <input
          name="realName"
          className={styles.name}
          id="realName"
          placeholder="Real Name"
        />
        <button className={styles.button} type="submit">
          Play
        </button>
        {this.state.signupErrorMsg && <Alert msg={this.state.signupErrorMsg} />}
      </form>
    );
  }
}

export default withRouter(Form);
