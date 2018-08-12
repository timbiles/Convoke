import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
import moment from 'moment';
import Fade from 'react-reveal/Fade';

import './Profile.css';
import Invite from '../Tools/Invite/Invite';

import {
  getUser,
  getAllUsers,
  getEventsAttending
} from '../../ducks/userReducer';
import { removeEvent } from '../../ducks/eventReducer';

class Profile extends Component {
  componentDidMount() {
    this.props.getEventsAttending(this.props.user.users_id);
  }

  handleDelete = id => {
    swal({
      position: 'top-end',
      type: 'warning',
      title: 'Removing this event is permanant.',
      text: 'Do you wish to continue?',
      confirmButtonText: 'Yes, remove it!',
      showCancelButton: true
    }).then(res => {
      if (res.value) {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Removed!',
          text: 'Your event has been deleted.',
          showConfirmButton: false,
          timer: 1000
        });
        axios.delete(`/api/delete/${id}/${this.props.user.users_id}`);
      } else if (res.dismiss === swal.DismissReason.cancel) {
        swal({
          position: 'top-end',
          type: 'error',
          title: 'Cancelled',
          text: 'Your Event is still here :)',
          showConfirmButton: false,
          timer: 1000
        });
      }
    })
    .then(()=> {
      this.props.getEventsAttending(this.props.user.users_id);
    })
  };

  render() {
    const {
      auth_id,
      name,
      email,
      home_town,
      img,
      bio,
      membership_date
    } = this.props.user;
    const { userEvents } = this.props.userEvents;

    const image = !img
      ? 'https://image.flaticon.com/icons/svg/21/21104.svg'
      : img;

    const created = this.props.events.events.filter(e => {
      return e.users_id === this.props.user.users_id;
    });

    return (
      <div className="mc_container">
        <div className="mc_display">
          {!auth_id.length ? (
            <div className="mc_login_text">
              <h2>Oops! Don't forget to Login!</h2>
              <a className="mc_link" href={process.env.REACT_APP_LOGIN}>
                <h1 className="mc_login_btn">Login</h1>
              </a>
            </div>
          ) : (
            <div className="profile_info">
              <div className="profile_left">
                <p className="mc_profile_name">{name}</p>
                <div className="img-email-edit">
                  <div className="mc_prof_img">
                    <img
                      className="profile_display_img"
                      src={image}
                      alt={auth_id}
                    />
                    <Link  to="/">
                      <h3 className="back_to_events">Back to Events Listing</h3>
                    </Link>
                  </div>

                  <div className="email_and_img_edit">
                    <h3>Email</h3>
                    <p>{email}</p>
                    <h3>Home Town</h3>
                    <p>{home_town}</p>
                    <h3>Member Since</h3>
                    <p>{moment(membership_date).format('MMM YYYY')}</p>
                  </div>
                </div>
                <h3>Bio</h3>
                <p className="profile_bio">{bio}</p>
                <Link className="edit_profile_link" to="/editprofile">
                  Edit Profile
                </Link>
              </div>
              <div className="profile_right">
                <h1 className="profile_dropdown">Created Events</h1>
                <h1 className="profile_created_events">
                  {created.map((e, i) => {
                    return (
                      <div key={i} className="create_map">
                        <Link className="create_map" to={`/events/${e.title}`}>
                          <h1 className="create_map_sub">{e.title}</h1>
                        </Link>
                      </div>
                    );
                  })}
                </h1>
              </div>
            </div>
          )}
        </div>

        <h1 className="profile_events_text">Attending Events</h1>

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
                <Link className="elv_title" to={`/events/${e.title}`}>
                  <Fade left cascade>
                    <h1 className="elv_title">{e.title.toUpperCase()}</h1>
                  </Fade>
                </Link>
                <div className="elv_sub_content">
                  <img className="elv_img" src={e.img} alt="Event pic" />
                  <div className="elv_sub_content1">
                    <p>[{e.host}]</p>
                    <p>
                      <img
                        className="eventcard_icon"
                        src="https://image.flaticon.com/icons/svg/33/33622.svg"
                        alt="map marker"
                      />{' '}
                      {e.location.substring(0, e.location.length - 5)}
                    </p>
                    <br />

                    <p className="showing_description">
                      {e.description &&
                        (e.description.length > 55
                          ? e.description.substring(0, 55) + '...'
                          : e.description)}
                    </p>
                    <p className="elv_people">
                      <img
                        className="events_person"
                        src="https://image.flaticon.com/icons/svg/10/10522.svg"
                        alt="person icon"
                      />
                      {
                        userEvents.filter(ev => {
                          return ev.events_id === e.events_id;
                        }).length
                      }
                    </p>
                    <div className="elv_icons">
                      <Invite currentEvent={e} />

                      <input
                        className="profile_remove_img"
                        type="image"
                        alt="Delete icon"
                        src="https://image.flaticon.com/icons/svg/59/59836.svg"
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
    removeEvent,
    getEventsAttending
  }
)(Profile);
