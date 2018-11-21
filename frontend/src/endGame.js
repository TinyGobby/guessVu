import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import styles from '../styles/chatroom.css';
import socket from './index.js';



class EndGame extends Component {
    constructor(props){
        super(props)
        this.startNewGame = this.startNewGame.bind(this)
    }

    startNewGame(){
        var that = this
        axios
        .post('/api/game/startnew', {

        })
        .then(function(response) {
            if (response.data.success == true) {
                socket.emit('startNewGame')
                that.props.history.push('/');
            }
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    render(){
        return(
            <div>
                <button onClick={this.startNewGame} className={styles.button}>
                    End game
                </button>
            </div>
        )
    }

}

export default withRouter(EndGame);
