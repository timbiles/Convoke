import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
import moment from 'moment';
import _ from 'lodash';
import Fade from 'react-reveal/Fade';

import './Profile.css';
import Invite from './Invite/Invite';

import { getUser, getAllUsers, getEventsAttending } from '../../ducks/userReducer';
import { removeEvent } from '../../ducks/eventReducer';

class Profile extends Component {
  componentDidMount() {
    this.props.getEventsAttending(this.props.user.users_id);
    // this.props.getAllUsers();        
    
  }

  handleDelete = id => {
    swal({
      position: 'top-end',
      type: 'warning',
      title: 'Removing this event is permanant.',
      text: 'Do you wish to continue?',
      confirmButtonText: 'Yes, remove it!',
      showCancelButton: true
    })
      .then(res => {
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
      .then(() => {
        this.props.getEventsAttending(this.props.user.users_id);
      });
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

    const image = !img
      ? 'https://image.flaticon.com/icons/svg/21/21104.svg'
      : img;

    const { userEvents } = this.props.userEvents;

    let mapped = _.mapValues(userEvents, function (e) {
      return e.events_id;
    });

    let filter = _.filter(mapped, function (e) {
      return e === e.events_id;
    }).length;

    let image1 = (
      <img
        className="events_person"
        src="https://image.flaticon.com/icons/svg/10/10522.svg"
        alt="person icon"
      />
    );

    console.log(this.props.events.events)

    const created = this.props.events.events.filter(e => {
      return e.users_id === this.props.user.users_id
    })

    const mapCreate = created.map((e, i) => {
      return (
        <div key={i} className='create_map'>

          <Link className='create_map' to={`/events/${e.title}`}>

            <h1 className='create_map_sub'>{e.title}</h1>
          </Link>

        </div>
      )
    })

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
              <div className='profile_info'>

                <div className='profile_left'>
                  <p className="mc_profile_name">{name}</p>
                  <div className="img-email-edit">
                    <img
                      className="profile_display_img"
                      src={image}
                      alt={auth_id}
                    />

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
                <div className='profile_right'>
                  <h1 className='profile_dropdown'>Created Events</h1>
                  <h1 className='profile_created_events'>
                    {mapCreate}
                  </h1>

                </div>
              </div>
            )}
        </div>

        <h1 className='profile_events_text'>Attending Events</h1>

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

                    <Invite />

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