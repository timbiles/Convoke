import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import './Connect.css';

import { getUser } from '../../ducks/userReducer';

class Connect extends Component {
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
  }

  render() {
    return (
      <div className="connect_container">
          <div className="connect_bar">
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
)(Connect);








// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import _ from 'lodash';


// import './Connect.css';
// import { getAllUsers } from '../../ducks/userReducer';

// class Connect extends Component {
//   componentDidMount() {
//     this.props.getAllUsers();
//   }

//   render() {
//     const { users } = this.props.user;

//     let map = _.mapValues(users, function(e) {
//       return e.img
//     });

//     let filter = _.filter(map, function(e) {
//         return e
//     })

//     // let map = users.map((e,i) => {
//     //     return (
//     //         <div key={i}>
//     //             e.img.source
//     //         </div>
//     //     )
//     // })

//     console.log(filter)

//     return (
//       <div className="connect_container">
//         <h1>Connect</h1>
//         {/* <div className="connect_sidebar"><img className='connect_img' src={filter} alt="user profile"/></div> */}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => state;

// export default connect(
//   mapStateToProps,
//   { getAllUsers }
// )(Connect);
