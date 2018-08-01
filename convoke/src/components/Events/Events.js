import React, { Component } from 'react';
import { connect } from 'react-redux';


import './Events.css';

import { getEvents } from '../../ducks/eventReducer';

class Events extends Component {
  render() {
    const { events } = this.props;
    

    let event =
      events.events.find(e => e.title === this.props.match.params.title) ||
      false;

    let date = String(event.date);
    let time = String(event.time);

    return (
      <div className="ie_container">
        <h1 className='ie_title'>{event.title}</h1>
        <div className="ie_box">
          <div className="ie_img_box">
            <img className="ie_img" src={event.img} alt={event.title} />
          </div>
          <div className="ie_info_container">
            <div className="ie_info_one">
              <h2>Event Creator</h2>
              <h3>{event.host}</h3>
              <h3>
                {date.substring(5, 10).replace(/-/g, '/')}/{date.substring(
                  0,
                  4
                )}
              </h3>
              <h3>
                {time[0] === '0' ? time.substring(1, 5) : time.substring(0, 5)}
              </h3>
              <h3>{event.location}</h3>
            </div>
            <div className="ie_info_two">
              <h2>Event Description</h2>
              <h4>{event.description}</h4>
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
  { getEvents }
)(Events);
