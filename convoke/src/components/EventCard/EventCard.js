import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import swal from 'sweetalert2';

import './EventCard.css';
import axios from 'axios';

import { getUser } from '../../ducks/userReducer';

import Button from '../Button/Button';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = val => {
    axios.post(`/api/add-event/${val}/${this.props.user.users_id}`)

    swal({
      position: 'top-end',
      type: 'success',
      title: 'Added to MyConvoke',
      showConfirmButton: false,
      timer: 1500
    });
  };

  render() {
    const { text, handleCardClick } = this.props;
    const { eachEvent } = this.props;

    // console.log(this.props.user.users_id)

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
          <input
            type="image"
            className="events_btn"
            src="https://image.flaticon.com/icons/svg/126/126469.svg"
            // src='https://image.flaticon.com/icons/svg/149/149411.svg'
            alt="Add to favs btn"
            onClick={e => this.handleClick(eachEvent.events_id)}
          />
          {/* <Button data={events} clickHandler={handleCardClick}>
        {text}
      </Button> */}
          <input
            type="image"
            className="events_info_btn"
            src="https://cdn0.iconfinder.com/data/icons/mobile-set/154/info-512.png"
            alt="info btn"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser }
)(Card);
// export default Card;
