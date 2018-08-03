import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import io from 'socket.io-client';

import './Chat.css';

import { getUser } from '../../ducks/userReducer';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      message: '',
      messages: []
    };

    this.socket = io('localhost:3001');

    this.socket.on('RECEIVE_MESSAGE', function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };

    this.sendMessage = e => {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        author: this.props.user.name || this.state.username,
        message: this.state.message
      });
      this.setState({ message: '' });
    };
  }

  componentDidMount() {
    this.props.getUser();
    // this.getMessages();
  }

  // getMessages = () => {
  //   axios.get('/api/message').then(res => {
  //     console.log(res);
  //     this.setState({ messages: res.data });
  //   });
  // };

  render() {
    // console.log(this.props)
    return (
      <div className="chat_container">
          <div className="chatbar">
          <h1>Message Feed</h1>
            {this.state.messages.map(e => {
              return (
                <div>
                  {e.author}: {e.message}
                </div>
              );
            })}
          </div>
          <div className="messaging_input">
            <input
              type="text"
              placeholder={this.props.user.name || 'Username'}
              value={this.props.user.name || this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
              className="messaging_form"
            />
            <input
              type="text"
              placeholder="Message"
              className="messaging_form"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
            />
            <br />
            <h2
              onClick={this.sendMessage}
              className="message_btn"
            >
              Send
            </h2>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUser
  }
)(Chat);
