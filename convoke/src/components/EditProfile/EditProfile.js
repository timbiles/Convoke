import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';

import './EditProfile.css';

import ImageUploader from '../Tools/ImageUploader/ImageUploader';

import {
  updateName,
  updateEmail,
  updateHomeTown,
  updateImg,
  updateBio,
  reset,
  updateUserInfo
} from '../../ducks/userReducer';

class EditProfile extends Component {
  state = {
    uploadedFileCloudinaryUrl: '',
    initialImage: true,
    editImage: false
  };

  handleSubmit = () => {
    let { auth_id, name, email, home_town, img, bio } = this.props.user;
    this.props.updateUserInfo(auth_id, name, email, home_town, img, bio);
  };

  toggleEdit = () => {
    this.setState({ editImage: true });
    this.setState({ initialImage: false });
  };

  toggleSubmitEdit = () => {
    this.setState({ initialImage: true });
    this.setState({ editImage: false });
  };

  render() {
    const { auth_id, name, email, home_town, img, bio } = this.props.user;
    const {
      updateName,
      updateEmail,
      updateHomeTown,
      updateBio,
      updateImg
    } = this.props;

    return (
      <div className="mc_container">
        <div className="ep_display">
          {!auth_id.length ? (
            <div>
              <h2>Oops! Don't forget to Login!</h2>
              <a className="mc_link" href={process.env.REACT_APP_LOGIN}>
                <h1 className="mc_login_btn">Login</h1>
              </a>
            </div>
          ) : (
            <div>
              <div className="ep_info_holder">
                <ContentEditable
                  html={name}
                  onChange={e => updateName(e.target.value)}
                  className="profile_editable_big"
                />
                <div className="ep_linebreak" />
                <div className="img-email-edit">
                  {this.state.initialImage && (
                    <div className="ep_img_cont">
                      <input
                        type="image"
                        className="ep_display_img"
                        src={this.state.uploadedFileCloudinaryUrl || img}
                        alt={auth_id}
                      />
                      <h1 className="ep_edit_pic" onClick={this.toggleEdit}>
                        Edit Profile Image
                      </h1>
                    </div>
                  )}

                  {this.state.editImage && (
                    <form>
                      <div className="ep_file_upload">
                        <ImageUploader updateImg={updateImg} />

                        <h1
                          className="ep_edit_pic"
                          onClick={this.toggleSubmitEdit}
                        >
                          Submit Image
                        </h1>
                      </div>
                    </form>
                  )}

                  <div className="email_and_img_edit">
                    <h3>Email</h3>
                    <ContentEditable
                      html={email}
                      onChange={e => updateEmail(e.target.value)}
                      className="profile_editable"
                    />
                    <div className="ep_linebreak" />
                    <h3>Home Town</h3>
                    <ContentEditable                    
                      html={home_town}
                      onChange={e => updateHomeTown(e.target.value)}
                      className="profile_editable"
                    />
                    <div className="ep_linebreak" />
                  </div>
                </div>
                <h3>Bio</h3>
                <ContentEditable
                  html={bio}
                  onChange={e => updateBio(e.target.value)}
                  className="profile_editable"
                />
                <div className="ep_linebreak" />
                <div>
                  <Link className="edit_submit_btn" to="/profile">
                    <h1
                      className="edit_submit_btn"
                      onClick={() => this.handleSubmit()}
                    >
                      Submit Edit
                    </h1>
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
    updateName,
    updateEmail,
    updateHomeTown,
    updateImg,
    updateBio,
    reset,
    updateUserInfo
  }
)(EditProfile);
