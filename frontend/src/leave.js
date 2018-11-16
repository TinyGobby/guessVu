import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import socket from './index'

const Leave = (props) => {

    const handleClick = () =>{
       console.log("in handleClick")
       console.log({"props" : props})
        axios
          .post('/api/user/leave', props.user)
          .then(function(response) {
              socket.emit('retrieveUsers');
              props.history.push('/');
          })
          .catch(function(error) {
            console.log(error);
          });
    }

    return (
        <button onClick={handleClick} className="leaveBtn">Leave game</button>
    )
}


export default withRouter(Leave);
