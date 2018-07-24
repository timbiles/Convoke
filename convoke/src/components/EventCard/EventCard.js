import React from 'react';
import { Link } from 'react-router-dom';

// import swal from 'sweetalert2';

import './EventCard.css';

// handleClick = () => {
//   swal({
//     position: "top-end",
//     type: "success",
//     title: "Hodor",
//     showConfirmButton: false,
//     timer: 250
//   });
// }

const Card = ({ events }) => {
  // console.log(events);

  return (
    <div className="events_container">
      <div className="events_title">
        <Link to={`/events/${events.title}`}>
          <h1 className="events_title" >{events.title}</h1>
        </Link>
      </div>
      <div>
        <img
          className="events_container_img"
          src={events.img}
          alt={events.title}
        />
        <h3 className="events_host"> [{events.host}]</h3>

        <h3>
          {events.date.substring(5, 10).replace(/-/g, '/')}/{events.date.substring(
            0,
            4
          )}
        </h3>

        {/* <h3>{events.date.substring(0, 10).replace(/-/g, '/')}</h3> */}
        <h3>
          {events.time[0] === '0'
            ? events.time.substring(1, 5)
            : events.time.substring(0, 5)}
        </h3>
        <h3>{events.location}</h3>
        <input
          type="image"
          className="events_btn"
          src="https://image.flaticon.com/icons/svg/126/126469.svg"
          alt="Add to favs btn"
          // onClick={this.handleClick}
        />
        <input
          type="image"
          className="events_info_btn"
          src="https://cdn0.iconfinder.com/data/icons/mobile-set/154/info-512.png"
          alt="info btn"
          // onClick={this.handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
