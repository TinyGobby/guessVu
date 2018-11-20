import React from 'react';
import styles from '../styles/alert.css'

const Alert = (props) => {
  return(
    <div>
      <br />
      <div className={styles.alertMsg} id="signupError">{props.msg}</div>
    </div>
  )
}

export default Alert;
