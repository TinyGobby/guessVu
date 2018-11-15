import React from 'react';

const Alert = (props) => {
  return(
    <div className="signupError">{props.msg}</div>
  )
}

export default Alert;
