import React, { Component } from 'react';
import Alert from './alert';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/form.css'

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signupErrorMsg: null
    }
  }

  handleSubmit() {
    var that = this;
    const fakeName = document.getElementById('fakeName').value;
    const realName = document.getElementById('realName').value;

    axios.post('/api/user', {
      fakeName: fakeName,
      realName: realName
    })
    .then(function (response) {
      console.log("within submit")
      if (response.data.success) {
        const user = response.data.user;
        that.props.setUser(user);
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

  render(){
    return (
      <div className="Form">
        <input name="fakeName" className={styles.name} placeholder="Fake Name" />
        <input name="realName" className={styles.name} placeholder="Real Name" />
        <button className={styles.button} type="submit" onClick={() => this.handleSubmit()}>
          Play
        </button>
        {this.state.signupErrorMsg && (
            <Alert msg={this.state.signupErrorMsg}/>
        )}

      </div>
    );
  }
}

export default withRouter(Form);
