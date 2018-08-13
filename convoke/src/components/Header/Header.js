import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';
import Avatar from '../Tools/Avatar/Avatar';
import Hamburger from '../Tools/Hamburger/Hamburger';

import {
  getUser,
  getEventsAttending,
  getAllUsers
} from '../../ducks/userReducer';
import { getEvents } from '../../ducks/eventReducer';
import { getUserEvents } from '../../ducks/userEventReducer';

class Header extends Component {
  componentDidMount() {
    this.props.getEvents();
    this.props
      .getUser()

      .then(() => {
        this.props.getEventsAttending(this.props.user.users_id);
        this.props.getUserEvents();
        this.props.getAllUsers();
      });

    // axios.delete('/api/deleteOldevent');
  }
  render() {
    const { auth_id } = this.props.user;

    return (
      <div className="header_container">
        <div className="header_link_container">
          <div className="link">
            {auth_id && (
              <Link className="link" to="/create">
                Create Event
              </Link>
            )}
          </div>
          <div className="right_header_links">
            {auth_id && (
              <Link className="link" to="/profile">
                MyConvoke
              </Link>
            )}

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
    getAllUsers,
    getEventsAttending,
    getEvents,
    getUserEvents
  }
)(Header);
