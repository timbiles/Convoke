import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';

import './CreateEvent.css';

import {
  updateEventName,
  updateHost,
  updateDate,
  updateTime,
  updateImg,
  reset
} from '../../ducks/createReducer';

class CreateEvent extends Component {
  handleSubmit = id => {
    let { title, host, date, time, img } = this.props.create;
    console.log(this.props);
    swal({
      position: 'top-end',
      type: 'success',
      title: 'Event Added',
      showConfirmButton: false,
      timer: 1000
    });

    axios
      .post(`/api/events`, {
        title,
        host,
        date,
        time,
        img
      })
      .then(() => this.props.reset());
  };

  handleKeyDown = e => {
    if (e.keycode === 13) {
      swal({
        position: 'top-end',
        type: 'success',
        title: 'Event Added',
        showConfirmButton: false,
        timer: 1000
      });

      let { title, host, date, time, img } = this.props.create;
      axios
        .post(`/api/events`, {
          title,
          host,
          date,
          time,
          img
        })
        .then(() => this.props.reset());
    }
  };

  render() {
    const { updateEventName, updateHost, updateDate, updateTime, updateImg } = this.props;
    // console.log(this.props);

    return (
      <div className="create_event_container">
        <div className="create_event_input">
          <h1>Event Name</h1>
          <input
            type="text"
            placeholder="Event Name"
            onChange={e => updateEventName(e.target.value)}
          />
          <h1>Hoster</h1>
          <input
            type="text"
            placeholder="Hoster"
            onChange={e => updateHost(e.target.value)}
          />
          <h1>Date</h1>
          <input
            type="text"
            placeholder="&quot;07/29/2017&quot;"
            onChange={e => updateDate(e.target.value)}
          />
          <h1>Time</h1>
          <input
            type="text"
            placeholder="&quot;12:00&quot;"
            onChange={e => updateTime(e.target.value)}
            onKeyDown={this.handleKeyDown}
          />
          <h1>Img URL</h1>
          <input
            type="text"
            placeholder="Place URL here"
            onChange={e => updateImg(e.target.value)}
            onKeyDown={this.handleKeyDown}
          />
          <Link to="/">
            <button onClick={id => this.handleSubmit(id)}>Submit Event</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { updateEventName, updateHost, updateDate, updateTime, updateImg, reset }
)(CreateEvent);
