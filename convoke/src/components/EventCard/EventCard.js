import React from 'react';
import { Link } from 'react-router-dom';

import swal from 'sweetalert2';

import './EventCard.css';

const handleClick = () => {
  swal({
    position: 'top-end',
    type: 'success',
    title: 'Added to MyConvoke',
    showConfirmButton: false,
    timer: 1500
  });
};

const Card = ({ events }) => {
  // console.log(events);

  return (
    <div className="events_container">
      <div className="events_title">
        <Link to={`/events/${events.title}`}>
          <h1 className="events_title">{events.title}</h1>
        </Link>
      </div>
      <div>
        <Link to={`/events/${events.title}`}>
          <img
            className="events_container_img"
            src={events.img}
            alt={events.title}
          />
        </Link>
        <h3 className="events_host"> [{events.host}]</h3>

        <h3>
        <img
            className="eventcard_icon"
            src="https://image.flaticon.com/icons/svg/25/25393.svg"
            alt="calendar"
          />
          {' '}
          {events.date.substring(5, 10).replace(/-/g, '/')}/{events.date.substring(
            0,
            4
          )}
        </h3>

        <h3>
          <img
            className="eventcard_icon"
            src="https://image.flaticon.com/icons/svg/61/61227.svg"
            alt="clock"
          />
          {' '}
          {events.time[0] === '0'
            ? events.time.substring(1, 5)
            : events.time.substring(0, 5)}
        </h3>
        <h3>
        <img
            className="eventcard_icon"
            src="https://image.flaticon.com/icons/svg/33/33622.svg"
            alt="map marker"
          />
          {' '}
        {events.location.substring(0, events.location.length-5)}</h3>
        <input
          type="image"
          className="events_btn"
          src="https://image.flaticon.com/icons/svg/126/126469.svg"
          alt="Add to favs btn"
          onClick={handleClick}
        />
        <input
          type="image"
          className="events_info_btn"
          src="https://cdn0.iconfinder.com/data/icons/mobile-set/154/info-512.png"
          alt="info btn"
        />
      </div>
    </div>
  );
};

export default Card;