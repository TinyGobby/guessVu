import React, { Component } from 'react';
import styles from '../styles/names.css';

class ShowRealNames extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.list} id='allRealNames'>
        <ul className={styles.unorderedList}>
        {this.props.realNames.map(element => (
          <li className={styles.names}>{element}</li>
        ))}
        </ul>
      </div>
    );
  }
}

export default ShowRealNames;
