import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({input: e.target.value})
  }

  handleSubmit(e){
    const that = this;
    e.preventDefault();
    console.log('test2');
    let socket= io.connect('localhost:3001')
    console.log(this.state.input);
    socket.on('connect', function(data) {
      socket.emit('inputTest', that.state.input);
    })
  }

  componentDidMount() {
    console.log('test');

    let socket= io.connect('localhost:3001')
    socket.on('connect', function(data) {
      socket.emit('blabla', 'Hello World from client');
    })
    
  }
  render() {
    return (

      <div className="App">
        Guess Vu!
        <div>
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.input} onChange={this.handleChange} />
          <button type='submit'>Submit!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
