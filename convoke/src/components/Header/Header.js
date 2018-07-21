import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default class Header extends Component {
  render() {
    return (

        <div className='header_container'>

          <Link to="/about">About</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/create">CreateEvent</Link>
          <Link to="/login">Login</Link>
          <Link to="/profile">Profile</Link>
        </div>

    );
  }
}
