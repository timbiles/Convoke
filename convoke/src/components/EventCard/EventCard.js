import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';

import './EventCard.css';

import InfoBtn from './InfoBtn';

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
    axios
      .delete(`/api/deleteEvent/${this.props.user.users_id}/${e}`)
      .then(res => {
        swal({
          position: 'top-end',
          type: 'warning',
          title: 'Removing this event is permanant.',
          text: 'Do you wish to continue?',
          confirmButtonText: 'Yes, remove it!',
          showCancelButton: true
        }).then(res => {
          if (res.value) {
            swal('Removed!', 'Your event has been deleted.', 'success');
          }
        });
      })
  };

  render() {
    const { eachEvent } = this.props;

    return (
      <div className="events_container">
        <div className="events_title">
          <Link to={`/events/${eachEvent.title}`}>
            <h1 className="events_title">{eachEvent.title}</h1>
          </Link>
        </div>
        <div>
          <Link to={`/events/${eachEvent.title}`}>
            <img
              className="events_container_img"
              src={eachEvent.img}
              alt={eachEvent.title}
            />
          </Link>
          <h3 className="events_host"> [{eachEvent.host}]</h3>

          <h3>
            <img
              className="eventcard_icon"
              src="https://image.flaticon.com/icons/svg/25/25393.svg"
              alt="calendar"
            />{' '}
            {eachEvent.date.substring(5, 10).replace(/-/g, '/')}/{eachEvent.date.substring(
              0,
              4
            )}
          </h3>

          <h3>
            <img
              className="eventcard_icon"
              src="https://image.flaticon.com/icons/svg/61/61227.svg"
              alt="clock"
            />{' '}
            {eachEvent.time[0] === '0'
              ? eachEvent.time.substring(1, 5)
              : eachEvent.time.substring(0, 5)}
          </h3>
          <h3>
            <img
              className="eventcard_icon"
              src="https://image.flaticon.com/icons/svg/33/33622.svg"
              alt="map marker"
            />{' '}
            {eachEvent.location.substring(0, eachEvent.location.length - 5)}
          </h3>
          {this.props.user.users_id === eachEvent.users_id && (
            <input
              className="remove_event_by_id"
              type="image"
              src="https://www.flaticon.com/premium-icon/icons/svg/484/484662.svg"
              alt="trash icon"
              onClick={e => this.handleDelete(eachEvent.events_id)}
            />
          )}

          <input
            type="image"
            className="events_btn"
            src="https://image.flaticon.com/icons/svg/126/126469.svg"
            alt="Add to favs btn"
            onClick={e => this.handleClick(eachEvent.events_id)}
          />
          <div className="events_info_btn">
            {/* <InfoBtn/> */}
            {eachEvent.host}
          </div>
          {/* <input
            type="image"
            className="events_info_btn"
            src="https://cdn0.iconfinder.com/data/icons/mobile-set/154/info-512.png"
            alt="info btn"
          /> */}
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
