import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/leave.css'

const Leave = (props) => {

    const handleClick = () =>{
       console.log("in handleClick")
       console.log({"props" : props})
        axios
          .post('/api/user/leave', props.user)
          .then(function(response) {
            console.log(response.data);
            props.history.push('/')
          })
          .catch(function(error) {
            console.log(error);
          });
    }

    return (
        <button onClick={handleClick} className={styles.button}>Leave game</button>
    )
}

export default withRouter(Leave);
