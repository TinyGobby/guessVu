import React, { Component } from 'react';

class DisplayMessages extends Component {
    constructor(props) {
      super(props);
    }

    render () {
        
        return (
            <div>
                <li>
                    {this.props.messages.map(element => { 
                        return <ul>{element.message}</ul>
                    })}
                </li>
            </div>

        )
    }
}

export default DisplayMessages;