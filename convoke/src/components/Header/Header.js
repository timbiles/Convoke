import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';

import { getUser } from '../../ducks/userReducer';

class Header extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const { auth_id } = this.props.user;
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
          <div className="right_header_links">
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
            {!auth_id.length ? (
              <div>
              <a className="link" href={process.env.REACT_APP_LOGIN}>
                <h1 className="link">Login</h1>
              </a>
            </div>
            ) : (
              <div>
              <a className="link" href={process.env.REACT_APP_LOGOUT}>
                <h1 className="link">Logout</h1>
              </a>
            </div>
            )}

            
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

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUser
  }
)(Header);
