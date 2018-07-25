import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Profile.css';

import { getUser } from '../../ducks/userReducer';

class Profile extends Component {
  render() {
    const { auth_id, name, email, home_town, img, bio } = this.props.user;

    console.log(this.props.user);

    return (
      <div className="mc_container">
        <div className="mc_title">{/* <h1>MyConvoke Page</h1> */}</div>
        <div className="mc_display">
          {!auth_id.length ? (
            <div>
              <h2>Oops! Don't forget to Login!</h2>
              <a className="mc_link" href={process.env.REACT_APP_LOGIN}>
                <h1 className="mc_login_btn">Login</h1>
              </a>
            </div>
          ) : (
            <div>
              <div>
                <h3>Email</h3>
                <p>{email}</p>
                <h3>Home Town</h3>
                <p>{home_town}</p>
                <div className="mc_img_and_edit">
                  <p className="mc_profile_name">{name}</p>
                  <img
                    className="profile_display_img"
                    src={img}
                    alt={auth_id}
                  />
                  <h3>Bio</h3>
                  <p>{bio}</p>
                  <Link className="" to="/editprofile">
                    Edit Profile
                  </Link>
                </div>
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
  {
    getUser
  }
)(Profile);

// fix css
