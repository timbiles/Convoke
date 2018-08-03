import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Avatar.css';

import { getUser } from '../../ducks/userReducer';

class Avatar extends Component {
  render() {
    const { img } = this.props.user;
    return (
      <div className="dropdown_avatar">
        <img className="header_avatar" src={img} alt="avatar" />
        <div className="dropdown_avatar_content">
          <Link className="dropdown_link" to="/Calendar">
            <h1 className='dropdown_link'>Calendar</h1>
          </Link>
          <Link className="dropdown_link" to="/Connect">
            <h1 className='dropdown_link'>Connect</h1>
          </Link>
          <a className="dropdown_link" href={process.env.REACT_APP_LOGOUT}>
            <h1 className="dropdown_link">Logout</h1>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser }
)(Avatar);
