import React, { Component } from 'react';
import styles from '../styles/names.css';

class ShowFakeNames extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="allFakeNames" id="allFakeNames">
        {this.props.fakeNames.map(element => {
          return (
            <div className={styles.namesDiv}>
              <ul>
                <li className={styles.names}>{element}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShowFakeNames;
