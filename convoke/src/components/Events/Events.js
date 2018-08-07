import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import './Events.css';

import {
  getEvents,
  updateTitle,
  updateHost,
  updateEventInfo
} from '../../ducks/eventReducer';
// import pic from '../EventCard/person.png';

class Events extends Component {
  handleSubmit = id => {
    let { host } = this.props.events.events;

    console.log(this.props.events.events)
    this.props.updateEventInfo(host);
  };

  render() {
    const { events } = this.props;

    let event =
      events.events.find(e => e.title === this.props.match.params.title) ||
      false;

    let date = String(event.date);
    let time = String(event.time);

    const { userEvents } = this.props.userEvents;

    let mapped = _.mapValues(userEvents, function(e) {
      return e.events_id;
    });

    let filter = _.filter(mapped, function(e) {
      return e === event.events_id;
    }).length;

    // let image1 = (
    //   <img
    //     className="events_person"
    //     src="https://image.flaticon.com/icons/svg/10/10522.svg"
    //     alt="person icon"
    //   />
    // );
    // let image2 = (
    //   <img className="events_person_white" src={pic} alt="person icon" />
    // );

    let one = filter === 1 ? ' person is going' : ' people going';

    return (
      <div className="ie_container">
        <h1 className="ie_title">{event.title}</h1>
        <div className="ie_box">
          <div className="ie_img_box">
            <img className="ie_img" src={event.img} alt={event.title} />
            <h2>
              {filter}
              {one}
            </h2>
          </div>
          <div className="ie_info_container">
            <div className="ie_info_one">
              <h2>Event Creator</h2>
              <h3>{event.host}</h3>
              <input
                placeholder={event.host}
                type="text"
                className="something_1"
                onChange={e => updateHost(e.target.value)}
              />
              <h3>{moment(date).format('dddd MMM Do, YYYY')}</h3>
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
          <button
            className="ep_submit_btn"
            onClick={id => this.handleSubmit(id)}
          >
            Submit Edit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getEvents, updateTitle, updateHost, updateEventInfo }
)(Events);
