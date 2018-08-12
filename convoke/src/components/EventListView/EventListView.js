import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert2';
import _ from 'lodash';
import moment from 'moment';
import Fade from 'react-reveal/Fade';

import './EventListView.css';

import { getUser, getEventsAttending } from '../../ducks/userReducer';

class EventListView extends Component {
  handleClick = val => {
    axios
      .post(`/api/add-event/${val}/${this.props.user.users_id}`)

      .then(res => {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Added to MyConvoke',
          // imageUrl:
          //   'http://images.hellogiggles.com/uploads/2015/09/17/bill_murray.jpg',
          // imageWidth: 175,
          // imageHeight: 250,
          // imageAlt: 'Custom image',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(err => {
        swal({
          position: 'top-end',
          type: 'warning',
          title: 'Oops! You are already going to this event.',
          text: 'See you there!',
          // imageUrl:
          //   'https://i.pinimg.com/originals/bc/a8/5f/bca85f46b77d4b2f2e247b13441b4fd8.jpg',
          // imageWidth: 175,
          // imageHeight: 250,
          // imageAlt: 'Custom going image',
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  handleDelete = e => {
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
          title: 'Deleted',
          text: 'Your Event has been deleted!',
          showConfirmButton: false,
          timer: 1500
        });
        axios
          .delete(`/api/deleteEvent/${this.props.user.users_id}/${e}`)

          .catch(() => {
            swal({
              position: 'top-end',
              type: 'warning',
              title:
                'You cannot remove an event that someone has already signed up for!'
            });
          });
      } else if (res.dismiss === swal.DismissReason.cancel) {
        swal('Cancelled', 'Your Event is still here :)', 'error');
      }
    });
  };

  render() {
    const { eachEvent } = this.props;
    const { userEvents } = this.props.userEvents;

    let mapped = _.mapValues(userEvents, function(e) {
      return e.events_id;
    });

    let filter = _.filter(mapped, function(e) {
      return e === eachEvent.events_id;
    }).length;

    return (
      <div className="elv_container">
        <div className="elv_sub_container">
          <div className="elv_date_container">
            <h1 className="elv_date">
              <img
                className="elv_calendar_icon"
                src="https://image.flaticon.com/icons/svg/25/25393.svg"
                alt="calendar"
              />{' '}
              {moment(eachEvent.date).format('dddd, MMM Do, YYYY')}
            </h1>
            <h1 className="elv_date">
              <img
                className="elv_time_icon"
                src="https://image.flaticon.com/icons/svg/61/61227.svg"
                alt="clock"
              />{' '}
              {moment(eachEvent.time).format('h:mm a')}
            </h1>
          </div>
          <Link className="elv_title" to={`/events/${eachEvent.title}`}>
            <Fade left cascade>
              <h1 className="elv_title">{eachEvent.title.toUpperCase()}</h1>
            </Fade>
          </Link>
          <div className="elv_sub_content">
            <img className="elv_img" src={eachEvent.img} alt="Event pic" />
            <div className="elv_sub_content1">
              <p>[{eachEvent.host}]</p>
              <br />
              <p>
                <img
                  className="eventcard_icon"
                  src="https://image.flaticon.com/icons/svg/33/33622.svg"
                  alt="map marker"
                />{' '}
                {eachEvent.location.replace(', USA', '')}

              </p>
              <br />
              <div className="evts_description">
                <img
                  className="eventcard_icon"
                  src="https://image.flaticon.com/icons/svg/684/684831.svg"
                  alt="Description icon"
                />{' '}
                <div className="showing_description1">
                  {eachEvent.description &&
                    (eachEvent.description.length > 55
                      ? eachEvent.description.substring(0, 55) + '...'
                      : eachEvent.description)}
                  <div className="hidden_description">
                    <h1>Event Description</h1>
                    <br />
                    {eachEvent.description}
                  </div>
                </div>
              </div>

              <p className="elv_people">
                <img
                  className="events_person"
                  src="https://image.flaticon.com/icons/svg/10/10522.svg"
                  alt="person icon"
                />
                {userEvents.length !== 0 && filter}
              </p>
              <div className="elv_icons">
                <img
                  type="image"
                  className="elv_add home_icon"
                  src="https://image.flaticon.com/icons/svg/149/149171.svg"
                  alt="Add to favs"
                  onClick={e => this.handleClick(eachEvent.events_id)}
                />

                {this.props.user.users_id === eachEvent.users_id && (
                  // <img className='elv_remove_initial' src="" alt="trash can"/>

                  <input
                    className="elv_remove_event home_icon"
                    type="image"
                    src="https://image.flaticon.com/icons/svg/107/107181.svg"
                    alt="trash icon"
                    onClick={e => this.handleDelete(eachEvent.events_id)}
                  />


                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser, getEventsAttending }
)(EventListView);
