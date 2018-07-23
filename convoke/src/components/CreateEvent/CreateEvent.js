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
  reset
} from '../../ducks/createReducer';

class CreateEvent extends Component {
  handleSubmit = id => {
    let { title, host, date, time } = this.props.create;
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
        time
      })
      .then(() => this.props.reset());
  };

  handleKeyPress = e => {
    if (e.keycode === 13) {
      let { title, host, date, time } = this.props.create;

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
          time
        })
        .then(() => this.props.reset());
    }
  };

  render() {
    const { updateEventName, updateHost, updateDate, updateTime } = this.props;
    // console.log(this.props);

    return (
      <div className='create_event_container'>
        
        <div className="create_event_input">
          <h1>Event Name</h1>
          <input type="text" onChange={e => updateEventName(e.target.value)} />
          <h1>Hoster</h1>
          <input type="text" onChange={e => updateHost(e.target.value)} />
          <h1>Date</h1>
          <input type="text" onChange={e => updateDate(e.target.value)} />
          <h1>Time</h1>
          <input type="text" onChange={e => updateTime(e.target.value)} />
          <Link to="/">
            <button
              onKeyPress={this.handleKeyDown}
              onClick={id => this.handleSubmit(id)}
            >
              Submit Event
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { updateEventName, updateHost, updateDate, updateTime, reset }
)(CreateEvent);
