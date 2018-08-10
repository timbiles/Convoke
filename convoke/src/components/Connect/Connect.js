import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import _ from 'lodash';

import './Connect.css';

import { getUser, getAllUsers } from '../../ducks/userReducer';

class Connect extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      message: '',
      users_id: '',
      messages: [],
      filteredPeople: []
    };

    this.socket = io(process.env.REACT_APP_SERVER);

    this.socket.on('RECEIVE_MESSAGE', function (data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages)

      axios.post(`/api/message/${this.props.user.users_id}`, {
        author: this.props.user.name,
        messages: data.message
      })
    };

    this.sendMessage = e => {
      e.preventDefault();
      console.log(this.props)
      this.socket.emit('SEND_MESSAGE', {
        author: this.props.user.name || this.state.username,
        message: this.state.message,
        users_id: this.props.user.users_id
      });
      this.setState({ message: '' });
    };
  }

  getMessages = () => {
    axios.get('/api/messages').then(res => {
      console.log(res.data);
      this.setState({ ...this.state, messages: res.data })
    })
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getAllUsers();
    this.getMessages();
    console.log(this.state)
  }

  handleChange = e => {
    this.setState({ filteredPeople: e })
  }

  handleClick = e => {
    this.setState({ filteredPeople: e });

    console.log(this.state.filteredPeople);
  };

  render() {

    let mapped = _.mapValues(this.props.user.users, function (e) {
      return e.img === null
        ? 'https://image.flaticon.com/icons/svg/21/21104.svg'
        : e.img;
    });

    let map = Object.values(mapped).map((e, i) => {
      return (
        <div key={i}>
          <img className="connect_profile_img" src={e} alt="user profile" />
          <h1>
            {' '}
            {this.props.user.users[i].img === e &&
              this.props.user.users[i].name}
          </h1>
        </div>
      );
    });


    console.log(this.props.user)
    console.log(this.state)

    return (
      <div className="connect_container">
        <div className="connect_users">
          <h1 className='connect_title'>Find Users</h1>
          {map}
        </div>
        <div className="connect_sub_container">
          <div className="connect_bar">
            <h1 className='connect_title'>Message Feed</h1>
            {this.state.messages.map((e, i) => {
              return (
                e.users_id === this.props.user.users_id ?
                  <h1 className='connect_user' key={i}>
                    <p className='connect_bold'>{e.author}</p>: {e.messages || e.message}
                  </h1>
                  :
                  <h1 className='connect_messenger' key={i}>
                    <p className='connect_bold'>{e.author}</p>: {e.messages || e.message}
                  </h1>
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
            <h2 onClick={this.sendMessage} className="message_btn">
              Send
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUser,
    getAllUsers
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
