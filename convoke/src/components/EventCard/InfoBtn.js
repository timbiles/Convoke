import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './InfoBtn.css';

import { getEvents } from '../../ducks/eventReducer';

class InfoBtn extends Component {
  render() {
    // const { host, date, time, location } = this.props.events.events;

    let mapped = this.props.events.events.map((e, i) => {
      return (
        <div key={i} >
          <h1>{e.host}</h1>
          {/* <h1>{e.date}</h1>
          <h1>{e.time}</h1>
          <h1>{e.location}</h1> */}
        </div>
      );
    });
    console.log(this.props.events.events);
    return (
      <div className="info_container">
        <img
          className="events_info_btn"
          src="https://cdn0.iconfinder.com/data/icons/mobile-set/154/info-512.png"
          alt="info btn"
        />
        <div className="dropdown-info">
          {mapped}
          {/* <h1>{host}</h1>
          <h1>{date}</h1>
          <h1>{time}</h1>
          <h1>{location}</h1> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getEvents }
)(InfoBtn);
