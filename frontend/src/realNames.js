import React, { Component } from 'react';
import styles from '../styles/names.css';

class ShowRealNames extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="allRealNames">
        {this.props.realNames.map(element => {
          return (
            <div>
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

export default ShowRealNames;
