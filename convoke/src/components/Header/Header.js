import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';
import Avatar from '../Avatar/Avatar';
import Hamburger from './Hamburger/Hamburger';

import { getUser, getEventsAttending } from '../../ducks/userReducer';
import { getEvents } from '../../ducks/eventReducer';
import { getUserEvents } from '../../ducks/userEventReducer';

class Header extends Component {
  componentDidMount() {
    this.props.getEvents();
    this.props.getUser();
    this.props.getEventsAttending(this.props.user.users_id);
    this.props.getUserEvents();
  }
  render() {
    const { auth_id } = this.props.user;

    return (
      <div className="header_container">
        <div className="header_link_container">
          <div className="link">
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
              <a className="link" href={process.env.REACT_APP_LOGIN}>
                <h1>Login</h1>
              </a>
            ) : (
              <div className="header_render_logout">
                <Avatar />
              </div>
            )}
          </div>
        </div>
        <Hamburger />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUser,
    getEventsAttending,
    getEvents,
    getUserEvents
  }
)(Header);
