import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header_container">
        <div>
          <Link className="link" to="/create">
            CreateEvent
          </Link>
        </div>
        <div>
          <Link className="link" to="/chat">
            Chat
          </Link>
          <Link className="link" to="/profile">
            Profile
          </Link>
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      </div>
    );
  }
}
