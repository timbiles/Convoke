import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import _ from 'lodash';
import moment from 'moment';
import Fade from 'react-reveal/Fade';

import Map from '../Tools/Map/Map';
import './EventCard.css';

import { getUser, getEventsAttending } from '../../ducks/userReducer';

class Card extends Component {
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
    })
      .then(res => {
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
      })
      .then(() => {
        this.context.history.push('/');
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

    let image1 = (
      <img
        className="events_person"
        src="https://image.flaticon.com/icons/svg/10/10522.svg"
        alt="person icon"
      />
    );

    return (
      <div className="events_container">
        <div className="flipper">
          <div className="events_flip">
            <div className="events_title">
              <Fade left cascade>
                <h1 className="events_title">
                  {eachEvent.title.toUpperCase()}
                </h1>
              </Fade>
            </div>
            <div className="events_sub_container">
              <img
                className="events_container_img"
                src={eachEvent.img}
                alt={eachEvent.title}
              />
              <h3 className="events_host"> [{eachEvent.host}]</h3>

              <h3>
                <img
                  className="eventcard_icon"
                  src="https://image.flaticon.com/icons/svg/25/25393.svg"
                  alt="calendar"
                />{' '}
                {moment.utc(eachEvent.date).format('MMM Do, YYYY')}
              </h3>

              <h3>
                <img
                  className="eventcard_icon"
                  src="https://image.flaticon.com/icons/svg/61/61227.svg"
                  alt="clock"
                />{' '}
                {moment(eachEvent.time).format('h:mm a')}
              </h3>
              <h3>
                <img
                  className="eventcard_icon"
                  src="https://image.flaticon.com/icons/svg/33/33622.svg"
                  alt="map marker"
                />{' '}
                {eachEvent.location.replace(', USA', '')}
              </h3>
              <p className="showing_description">
                <img
                  className="eventcard_icon"
                  src="https://image.flaticon.com/icons/svg/684/684831.svg"
                  alt="Description icon"
                />{' '}
                {eachEvent.description &&
                  (eachEvent.description.length > 55
                    ? eachEvent.description.substring(0, 55) + '...'
                    : eachEvent.description)}
              </p>

              <h3 className="people_num_container">
                <p className="ec_person">
                  {image1}
                  {userEvents.length !== 0 && filter}
                </p>
              </h3>

              <div className="events_info_btn">
                <input
                  type="image"
                  className="events_info_btn"
                  src="https://cdn0.iconfinder.com/data/icons/mobile-set/154/info-512.png"
                  alt="info btn"
                />
                <div className="events_info_btn_dropdown">
                  <p>{eachEvent.host}</p>
                  <p>{moment.utc(eachEvent.date).format('M/D/YYYY')}</p>
                  <p>{moment(eachEvent.time).format('h:mm a')}</p>
                  <p>{eachEvent.location.replace(', USA', '')}</p>
                  <p>
                    {image1}
                    {userEvents.length !== 0 && filter}
                  </p>

                  {this.props.user.users_id === eachEvent.users_id && (
                    <input
                      className="remove_icon_dropdown"
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

          <div className="back_flip">
            <Link className="back_flip_title" to={`/events/${eachEvent.title}`}>
              <h1 className="back_flip_title">
                {eachEvent.title.toUpperCase()}
              </h1>
            </Link>
            <div className="ec_map">
              <Map
                lat={eachEvent.lat}
                lng={eachEvent.lng}
                center={{
                  lat: eachEvent.lat,
                  lng: eachEvent.lng
                }}
              />
            </div>
            <h3>
              <img
                className="eventcard_icon"
                src="https://image.flaticon.com/icons/svg/33/33622.svg"
                alt="map marker"
              />{' '}
              {eachEvent.location.replace(', USA', '')}
            </h3>
            {this.props.user.users_id === eachEvent.users_id && (
              <input
                className="remove_event_by_id"
                type="image"
                src="https://image.flaticon.com/icons/svg/107/107181.svg"
                alt="trash icon"
                onClick={e => this.handleDelete(eachEvent.events_id)}
              />
            )}

            <input
              type="image"
              className="events_btn"
              src="https://image.flaticon.com/icons/svg/149/149411.svg"
              alt="Add to favs btn"
              onClick={e => this.handleClick(eachEvent.events_id)}
            />
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
)(Card);
