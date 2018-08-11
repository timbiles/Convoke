import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser } from '../../../ducks/userReducer';

class Hamburger extends Component {
  render() {
    const { auth_id, img } = this.props.user;
    return (
      <div className="hamburger_container">
        <img
          className="hamburger"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/220px-Hamburger_icon.svg.png"
          alt="hamburger icon"
        />
        <div className="hamburger_dropdown">
          {!auth_id.length ? (
            <a className="link" href={process.env.REACT_APP_LOGIN}>
              <h1>Login</h1>
            </a>
          ) : (
            <div className="hamburger_dropdown">
              <Link
                onClick={() => {
                  window.scroll({ top: 1000, behavior: 'smooth' });
                }}
                className="link hamburger_link"
                to="/profile"
              >
                MyConvoke
              </Link>
              <br />
              <Link
                onClick={() => {
                  window.scrollTo({ top: 1000, behavior: 'smooth' });
                }}
                className="link hamburger_link"
                to="/create"
              >
                Create Event
              </Link>

              <Link
                onClick={() => {
                  window.scroll({ top: 1000, behavior: 'smooth' });
                }}
                className="link hamburger_link"
                to="/connect"
              >
                Connect
              </Link>

              <Link className="link hamburger_link" to="/Calendar">
                Calendar
              </Link>
              <div>
                <a className="link" href={process.env.REACT_APP_LOGOUT}>
                  <h1 className="link">Logout</h1>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser }
)(Hamburger);
