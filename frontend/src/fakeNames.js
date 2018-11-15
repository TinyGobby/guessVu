// endpoint /api//user/allfakenames
import React, { Component } from 'react';

class ShowFakeNames extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="allFakeNames">
        {this.props.fakeNames.map(element => {
          return (
            <div>
              <ul>
                <li className="fakeName">{element}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShowFakeNames;
