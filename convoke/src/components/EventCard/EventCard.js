import React from 'react';
import './EventCard.css';

const Card = ( {events} ) => {
  // console.log(events)

  return (
    <div className="events_container">
      <h1>{events.title}</h1>
      <h3>{events.host}</h3>
      <h3>{events.date.substring(0, 10).replace(/-/g, '/')}</h3>
      <h3>{events.time.substring(0,5)}</h3>
      <button>Attend Event!</button>
    </div>
  );
};

export default Card;
