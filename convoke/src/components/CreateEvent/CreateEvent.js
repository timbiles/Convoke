import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

import './CreateEvent.css';

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
    handleSubmit = id => {
    let { title, host, date, time, ampm, location, img } = this.props.create;
    let {users_id} = this.props.user
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
        ampm,
        location,
        img,
        users_id
      })
      // .then(() => this.props.reset());
  };

  handleKeyDown = e => {
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

  handleSelect = location => {
    geocodeByAddress(location)
      .then(location => getLatLng(location[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    const {
      updateEventName,
      updateHost,
      updateDate,
      updateTime,
      updateLocation,
      updateImg
    } = this.props;
    const { auth_id } = this.props.user;

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
            />
          <h1>Location</h1>
          <PlacesAutocomplete
            value={this.props.create.location}
            onChange={updateLocation}
            onSelect={this.handleSelect}
            onKeyDown={this.handleKeyDown}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
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
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
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
            // onKeyDown={this.handleKeyDown}
          />
          <Link to="/">
            <button onClick={id => this.handleSubmit(id)}>Submit Event</button>
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



/* <div>
            <input
              type="text"
              placeholder="&quot;12:00&quot;"
              onChange={e => updateTime(e.target.value)}
            />
            <select className="am_pm" onSelect={e=> updateAmPm(e.target.value)}>
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div> */