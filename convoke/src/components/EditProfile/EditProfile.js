import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './EditProfile.css';

import {
  getUser,
  updateName,
  updateEmail,
  updateHomeTown,
  updateImg,
  updateBio,
  reset,
  updateUserInfo
} from '../../ducks/userReducer';

class EditProfile extends Component {
  handleSubmit = id => {
    let { name, email, home_town, img, bio, auth_id } = this.props.user;
    this.props
      .updateUserInfo(auth_id, name, email, home_town, img, bio)

  };

  render() {
    const { auth_id } = this.props.user;
    const {
      updateName,
      updateEmail,
      updateHomeTown,
      updateImg,
      updateBio
    } = this.props;

    console.log(this.props.user);

    return (
      <div className="ep_container">
        <div className="ep_box_container">
          {!auth_id.length ? (
            <div>
              <h1>Don't forget to Login!</h1>
              <a className="" href={process.env.REACT_APP_LOGIN}>
                <h1 className="">Login</h1>
              </a>
            </div>
          ) : (
            <div className="ep_input">
              <h1>Update Name</h1>
              <input
                className="update_profile_name"
                placeholder="Update Name"
                type="text"
                onChange={e => updateName(e.target.value)}
              />
              <h1>Update Email</h1>
              <input
                className="update_profile_email"
                placeholder="Update Email"
                type="text"
                onChange={e => updateEmail(e.target.value)}
              />
              <h1>Update Home Town</h1>
              <input
                className="update_profile_home_town"
                placeholder="Update Home Town"
                type="text"
                onChange={e => updateHomeTown(e.target.value)}
              />
              <h1>Update Image</h1>
              <input
                className="update_profile_Img"
                placeholder="Update Image"
                type="text"
                onChange={e => updateImg(e.target.value)}
              />
              <h1>Update Bio</h1>
              <input
                className="update_profile_bio"
                placeholder="Update Bio"
                type="text"
                onChange={e => updateBio(e.target.value)}
              />
              <Link to="/profile">
                <button onClick={id => this.handleSubmit(id)}>
                  Submit Edit
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* {this.state.users.name} */}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUser,
    updateName,
    updateEmail,
    updateHomeTown,
    updateImg,
    updateBio,
    reset,
    updateUserInfo
  }
)(EditProfile);
