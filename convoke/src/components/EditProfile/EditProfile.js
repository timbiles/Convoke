import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import './EditProfile.css';

import {
  getEventsAttending,
  updateName,
  updateEmail,
  updateHomeTown,
  updateImg,
  updateBio,
  reset,
  updateUserInfo
} from '../../ducks/userReducer';

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dwvrok1le/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ncjyrxth';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      uploadedFileCloudinaryUrl: '',
      initialImage: true,
      editImage: false
    };
  }
  componentDidMount() {
    this.props.getEventsAttending(this.props.user.users_id);
  }
  handleSubmit = id => {
    let { name, email, home_town, img, bio, auth_id } = this.props.user;
    this.props.updateUserInfo(auth_id, name, email, home_town, img, bio);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      let { name, email, home_town, img, bio, auth_id } = this.props.user;
      this.props.updateUserInfo(auth_id, name, email, home_town, img, bio);
    }
  };

  toggleEdit = () => {
    this.setState({ editImage: true });
    this.setState({ initialImage: false });
  };

  toggleSubmitEdit = () => {
    this.setState({ initialImage: true });
    this.setState({ editImage: false });
  };

  onImageDrop = files => {
    // this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[0]);
  };

  handleImageUpload = file => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.log(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        this.props.updateImg(response.body.secure_url);
      }
    });
  };

  render() {
    const { auth_id, name, email, home_town, img, bio } = this.props.user;
    const { updateName, updateEmail, updateHomeTown, updateBio } = this.props;

    return (
      <div className="mc_container">
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
                <input
                  className="update_profile_name"
                  value={name}
                  type="text"
                  onChange={e => updateName(e.target.value)}
                  onKeyDown={this.handleKeyDown}
                />
                <div className="img-email-edit">
                  {this.state.initialImage && (
                    <div>
                      <input
                        type="image"
                        className="ep_display_img"
                        src={this.state.uploadedFileCloudinaryUrl || img}
                        // onChange={e => updateImg(e.target.value)}
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
                        <Dropzone
                          onDrop={this.onImageDrop}
                          multiple={false}
                          accept="image/*"
                          className="image_dropzone"
                        >
                          <div>
                            {this.state.uploadedFileCloudinaryUrl === '' ? (
                              <p className="dropzone_text">
                                Drop an image or click to select a file to
                                upload.
                              </p>
                            ) : (
                              <div>
                                {/* <p>{this.state.uploadedFile.name}</p> */}
                                <img
                                  className="ep_upload_pic"
                                  src={img}
                                  alt="profile pic"
                                />
                              </div>
                            )}
                          </div>
                        </Dropzone>
                        <h1 className="ep_edit_pic" onClick={this.toggleSubmitEdit}>
                        Submit Image
                      </h1>
                      </div>
                    </form>
                  )}

                  <div className="email_and_img_edit">
                    <h3>Email</h3>
                    <input
                      className="update_profile_email"
                      value={email}
                      type="text"
                      onChange={e => updateEmail(e.target.value)}
                    />
                    <h3>Home Town</h3>
                    <input
                      className="update_profile_home_town"
                      value={home_town}
                      type="text"
                      onChange={e => updateHomeTown(e.target.value)}
                    />
                  </div>
                </div>
                <h3>Bio</h3>
                <textarea
                  className="update_profile_bio"
                  value={bio}
                  type="text"
                  onChange={e => updateBio(e.target.value)}
                />
                <div>
                  <Link to="/profile">
                    <h1
                      onKeyDown={this.handleKeyDown}
                      className="ep_submit_btn"
                      onClick={id => this.handleSubmit(id)}
                    >
                      Submit Edit
                    </h1>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mc_events_display">
          {this.props.user.eventsAttending.map((e, i) => {
            return (
              <div className="mc_events_cards" key={e.id}>
                <div className="mc_name_and_img">
                  <h1>{e.title}</h1>
                  <img className="mc_events_img" src={e.img} alt={e.title} />
                </div>
                <p>{e.host}</p>
                <p>{moment(e.date).format('MMM Do, YYYY')}</p>
                <p>{moment(e.time).format('h:mm a')}</p>
                <p>{e.location.substring(0, e.location.length - 5)}</p>
                <input
                  className="profile_remove_img"
                  type="image"
                  alt="Delete icon"
                  src="https://image.flaticon.com/icons/svg/118/118743.svg"
                  onClick={id => {
                    this.handleDelete(e.events_id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getEventsAttending,
    updateName,
    updateEmail,
    updateHomeTown,
    updateImg,
    updateBio,
    reset,
    updateUserInfo
  }
)(EditProfile);
