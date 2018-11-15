// endpoint /api//user/allrealnames
import React, { Component } from 'react';

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
                <li className="realName">{element}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShowRealNames;
