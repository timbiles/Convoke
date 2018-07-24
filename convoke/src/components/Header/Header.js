import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header_container">
        <div className="header_link_container">
          <div>
            <Link className="link" to="/create">
              Create Event
            </Link>
          </div>
          <div>
            <Link className="link" to="/chat">
              Chat
            </Link>
            <Link className="link" to="/profile">
              MyConvoke
            </Link>
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
        </div>
        <img
          className="hamburger"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/220px-Hamburger_icon.svg.png"
          alt="hamburger icon"
        />
      </div>
    );
  }
}
