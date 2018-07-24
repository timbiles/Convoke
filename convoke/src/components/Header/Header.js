import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="header_container">
        <div className="header_link_container">
          <div>
            <Link
              onClick={() => {
                window.scrollTo({ top: 1000, behavior: 'smooth' });
              }}
              className="link"
              to="/create"
            >
              Create Event
            </Link>
          </div>
          <div className='right_header_links'>
            <Link
              onClick={() => {
                window.scroll({ top: 1000, behavior: 'smooth' });
              }}
              className="link"
              to="/chat"
            >
              Chat
            </Link>
            <Link
              onClick={() => {
                window.scroll({ top: 1000, behavior: 'smooth' });
              }}
              className="link"
              to="/profile"
            >
              MyConvoke
            </Link>
            {/* <Link
              onClick={() => {
                window.scroll({ top: 1000, behavior: 'smooth' });
              }}
              className="link"
              to="/login"
            >
              Login
            </Link> */}
            <div>
              <a className="link" href={process.env.REACT_APP_LOGIN}>
                <h1 className="link">Login</h1>
              </a>
            </div>
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
