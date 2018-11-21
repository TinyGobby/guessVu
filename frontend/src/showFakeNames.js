import React, { Component } from 'react';
import styles from '../styles/names.css';

class ShowFakeNames extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={styles.list} id='allRealNames'>
          <ul className={styles.unorderedList}>
          {this.props.fakeNames.map(element => (
            <li className={styles.names}>{element}</li>
          ))}
          </ul>
        </div>
    );
  }
}

export default ShowFakeNames;
