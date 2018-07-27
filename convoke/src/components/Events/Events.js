import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Events.css';

import { getEvents } from '../../ducks/eventReducer';

class Events extends Component {
  componentDidMount() {
    // this.props.getEvents();
  }
  render() {
    const { events } = this.props;
    // console.log(events)

    let event =
      events.events.find(e => e.title === this.props.match.params.title) ||
      false;

    let date = String(event.date);
    let time = String(event.time);

    return (
      <div className="individual_event_container">
        <div className="individual_event_box">
          <h1>{event.title}</h1>
          <img className="individual_event_img" src={event.img} alt={event.title} />
          <h3>{event.host}</h3>
          <h3>
            {date.substring(5, 10).replace(/-/g, '/')}/{date.substring(0, 4)}
          </h3>
          <h3>
            {time[0] === '0' ? time.substring(1, 5) : time.substring(0, 5)}
          </h3>
          <h3>{event.location}</h3>
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
