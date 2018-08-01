import React from 'react';
import _ from 'lodash';

import pic from './person.png';


const Attending = filter => {
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
    let image2 = (
      <img className="events_person_white" src={pic} alt="person icon" />
    ); 
}

export default Attending;