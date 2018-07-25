import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Profile.css';

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

class Profile extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       users: []
  //     };
  //   }

  componentDidMount() {
    this.props.getUser().then(response => {
      console.log('AFTER YOU GET USER....', this.props);
    });
  }

  handleSubmit = id => {
    let { name, email, home_town, img, bio, auth_id } = this.props.user;
    this.props.updateUserInfo(auth_id, name, email, home_town, img, bio);
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
    return (
      <div className="profile_container">
        <div className='profile_edit_container'>
          {/* {!user.length && ( */}
          {/* {auth_id && ( */}
            <div className='profile_edit_box'>
            <h1>Update Name</h1>
              <input
                className="update_profile_name"
                placeholder="Update Name"
                type="text"
                //   value={this.props.user.name}
                onChange={e => updateName(e.target.value)}
              />
              <h1>Update Email</h1>
              <input
                className="update_profile_email"
                placeholder="Update Email"
                type="text"
                //   value={user.email}
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
              <button onClick={id => this.handleSubmit(id)}>Submit Edit</button>
            </div>
          {/* )} */}
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
)(Profile);
