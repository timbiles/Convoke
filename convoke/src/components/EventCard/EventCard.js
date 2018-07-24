import React from 'react';
import swal from "sweetalert2";

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
      <div className='events_title'>
        <h1>{events.title}</h1>
      </div>
      <div>
        <img
          className="events_container_img"
          src={events.img}
        />
        <h3>{events.host}</h3>
        <h3>{events.date.substring(0, 10).replace(/-/g, '/')}</h3>
        <h3>{events.time.substring(0, 5)}</h3>

        <input
            type="image"
            className="events_btn"
            src="https://cdn0.iconfinder.com/data/icons/minimal-set-four/32/minimal-19-512.png"
            alt="Smiley face"
            // onClick={this.handleClick}
          />
      </div>
    </div>
  );
};

export default Card;
