import React, { Component } from 'react';
// import io from 'socket.io-client';
// import './Chat.css';
// import { USER_CONNECTED } from '../../ChatEvents';

// const socketUrl = 'http://localhost:3001';

export default class Chat extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     socket: null,
  //     user: null
  //   };
  // }

  // componentDidMount() {
  //   this.initSocket();
  // }

  // initSocket = () => {
  //   const socket = io(socketUrl);

  //   socket.on('connect', () => {
  //     console.log('connected');
  //   });
  //   this.setState({ socket });
  // };

  // setUser = user => {
  //   const { socket } = this.state;
  //   // socket.emit(USER_CONNECTED);
  //   this.setStatePuser;
  // };

  render() {
    return (
      <div>
        <h1>Chat App</h1>
      </div>
    );
  }
}
