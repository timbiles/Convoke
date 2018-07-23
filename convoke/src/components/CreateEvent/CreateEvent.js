import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './CreateEvent.css';

import {
  updateEventName,
  updateHost,
  updateDate,
  updateTime,
  reset
} from '../../ducks/createReducer';

class CreateEvent extends Component {
  // componentDidMount() {
  //   this.createEvents();
  // }

  handleSubmit = id => {
    let { title, host, date, time } = this.props.create;
    console.log(this.props);

    axios
      .post(`/api/events`, {
        title,
        host,
        date,
        time
      })
      .then(() => this.props.reset());
  };

  render() {
    const { updateEventName, updateHost, updateDate, updateTime } = this.props;
    console.log(this.props);

    // let createEventMap = events.map((e, i) => {
    //   return (
    //     <div>
    //       <h1 />
    //       <h3 />
    //       <h3 />
    //       <h3 />
    //     </div>
    //   );
    // });

    return (
      <div className="create_event_container">
        <div>
          <h1>CreateEvent</h1>
        </div>
        <div>
          <input type="text" onChange={e => updateEventName(e.target.value)} />
          <input type="text" onChange={e => updateHost(e.target.value)} />
          <input type="text" onChange={e => updateDate(e.target.value)} />
          <input type="text" onChange={e => updateTime(e.target.value)} />
          <button onClick={id => this.handleSubmit(id)}>Submit Event</button>
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
