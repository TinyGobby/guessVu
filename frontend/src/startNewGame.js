import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import styles from '../styles/chatroom.css';



class StartNewGame extends Component {
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
            console.log("response of startnewgame - received response from backend")
            console.log(response)
            if (response.data.success == true) {
                console.log("inside true of response of startnewgame")
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
                    Start new game
                </button>
            </div>
        )
    }

}

export default withRouter(StartNewGame);
