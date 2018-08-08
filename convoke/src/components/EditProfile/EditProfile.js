import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import ContentEditable from 'react-contenteditable';
import Fade from 'react-reveal/Fade';
import _ from 'lodash';

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
  handleSubmit = () => {
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
    const { userEvents } = this.props.userEvents;

    let mapped = _.mapValues(userEvents, function(e) {
      return e.events_id;
    });

    let filter = _.filter(mapped, function(e) {
      return e === e.events_id;
    }).length;

    let image1 = (
      <img
        className="events_person"
        src="https://image.flaticon.com/icons/svg/10/10522.svg"
        alt="person icon"
      />
    );

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
              <ContentEditable
                      html={name}
                      onChange={e => updateName(e.target.value)}
                      className='profile_editable_big'
                    />
                <div className="img-email-edit">
                  {this.state.initialImage && (
                    <div>
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
                  <ContentEditable
                      html={email}
                      onChange={e => updateEmail(e.target.value)}
                      className='profile_editable'
                    />
                      <h3>Home Town</h3>
                    <ContentEditable
                      html={home_town}
                      onChange={e => updateHomeTown(e.target.value)}
                      className='profile_editable'
                    />
                  </div>
                </div>
                <h3>Bio</h3>
                <ContentEditable
                      html={bio}
                      onChange={e => updateBio(e.target.value)}
                      className='profile_editable'
                    />
                <div>
                  <Link className="edit_submit_btn" to="/profile">
                    <h1
                      onKeyDown={this.handleKeyDown}
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

        <div className="mc_events_display">
          {this.props.user.eventsAttending.map((e, i) => {
            return (
              <div key={i} className="profile_sub_container">
                <div className="elv_date_container">
                  <h1 className="profile_date">
                    <img
                      className="profile_icon"
                      src="https://image.flaticon.com/icons/svg/25/25393.svg"
                      alt="calendar"
                    />{' '}
                    {moment(e.date).format('dddd, MMM Do, YYYY')}
                  </h1>
                  <h1 className="profile_date">
                    <img
                      className="profile_icon"
                      src="https://image.flaticon.com/icons/svg/61/61227.svg"
                      alt="clock"
                    />{' '}
                    {moment(e.time).format('h:mm a')}
                  </h1>
                </div>
                <Fade left cascade>
                  <h1 className="elv_title">{e.title.toUpperCase()}</h1>
                </Fade>
                <div className="elv_sub_content">
                  <img
                    className="elv_img"
                    src={e.img}
                    alt="Event pic"
                  />
                  <div className="elv_sub_content1">
                    <p>[{e.host}]</p>
                    <p>
                      <img
                        className="eventcard_icon"
                        src="https://image.flaticon.com/icons/svg/33/33622.svg"
                        alt="map marker"
                      />{' '}
                      {e.location.substring(
                        0,
                        e.location.length - 5
                      )}
                    </p>
                    <br />

                    <p className="showing_description">
                      {e.description &&
                        (e.description.length > 55
                          ? e.description.substring(0, 55) + '...'
                          : e.description)}
                    </p>
                    <p className="elv_people">
                      {image1}
                      {userEvents.length !== 0 && filter}
                    </p>
                    <div className="elv_icons">
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="mc_events_display">
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
        </div> */}

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
