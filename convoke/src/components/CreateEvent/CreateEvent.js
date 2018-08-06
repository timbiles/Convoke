import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import DatePicker from 'react-custom-date-picker';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import _ from 'lodash';

import './CreateEvent.css';
import 'rc-time-picker/assets/index.css';

import {
  updateEventName,
  updateHost,
  updateDate,
  updateTime,
  updateAmPm,
  updateLocation,
  updateImg,
  reset
} from '../../ducks/createReducer';

import { getUser } from '../../ducks/userReducer';

class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      locationSelect: ''
    };
  }
  handleDateChange = date => {
    this.props.create.date = moment(date).format('YYYY-MM-DD');
  };

  handleTime = time => {
    this.props.create.time = time;
  };

  handleSubmit = id => {
    let { title, host, date, time, location, img } = this.props.create;
    let { users_id, name, email } = this.props.user;

    axios
      .post(`/api/events`, {
        title,
        host,
        date,
        time,
        location,
        img,
        users_id
      })
      .then(() => {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Event Added',
          showConfirmButton: false,
          timer: 1000
        });
      });
    axios.post(`/api/email`, {
      email,
      name,
      title,
      date,
      time
    });
  };

  handleKeyDown2 = e => {
    let { title, host, date, time, ampm, location, img } = this.props.create;

    if (e.keyCode === 13) {
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
          ampm,
          location,
          img
        })
        .then(() => this.props.reset());
    }
  };

  render() {
    const {
      updateEventName,
      updateHost,
      updateLocation,
      updateImg
    } = this.props;
    const { auth_id } = this.props.user;

    const format = 'h:mm a';

    const day = moment().format('MM/DD/YYYY');

    const today = new Date();

    return (
      <div className="create_event_container">
        {!auth_id.length ? (
          <div>
            <h1>You have to login to Create an Event!</h1>
            <a className="" href={process.env.REACT_APP_LOGIN}>
              <h1 className="">Login</h1>
            </a>
          </div>
        ) : (
          <div className="create_event_input">
            <h1>Event Name</h1>
            <div className="something">
              <input
                className="ce_input_field"
                type="text"
                placeholder="Event Name"
                onChange={e => updateEventName(e.target.value)}
              />
              {/* <span className='floating_placeholder'>Event Name</span> */}
            </div>
            <h1>Hoster</h1>
            <input
              type="text"
              placeholder={this.props.user.name}
              onChange={e => updateHost(e.target.value)}
            />
            <h1>Date</h1>

            <DatePicker
              color="#296b3e"
              date={this.props.create.date}
              errorColor="#c32c27"
              handleDateChange={this.handleDateChange}
              hoverWeek
              inputStyle={{
                borderRadius: 0
              }}
              lightHeader
              required
              // modal
              placeholder={day}
              minDate={today}
            />

            <h1>Time</h1>

            <TimePicker
              showSecond={false}
              defaultValue={moment()}
              className="ce_time"
              onChange={this.handleTime}
              format={format}
              use12Hours
              style={{ width: 100 }}
            />

            <h1>Location</h1>
            <PlacesAutocomplete
              value={this.props.create.location}
              onChange={updateLocation}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <div className="location_container">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input'
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#d1cfcf', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <h1>Img URL</h1>
            <input
              type="text"
              placeholder="Place URL here"
              onChange={e => updateImg(e.target.value)}
              onKeyDown={this.handleKeyDown2}
            />
            <Link to="/">
              <h1 className="ce_button" onClick={id => this.handleSubmit(id)}>
                Submit Event
              </h1>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    updateEventName,
    updateHost,
    updateDate,
    updateTime,
    updateAmPm,
    updateLocation,
    updateImg,
    reset,
    getUser
  }
)(CreateEvent);
