import React from 'react';

const Card = ({ events }) => {
  return (
    <div>
      <h1>{events.title}</h1>
      <h3>{events.host}</h3>
      <h3>{events.date}</h3>
    </div>
  );
};

export default Card;
