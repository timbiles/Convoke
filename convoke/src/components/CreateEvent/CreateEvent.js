
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
import Dropzone from 'react-dropzone';
import request from 'superagent';

import './CreateEvent.css';
import 'rc-time-picker/assets/index.css';

import {
  updateEventName,
  updateHost,
  updateDate,
  updateTime,
  updateLocation,
  updateImg,
  updateDescription,
  reset
} from '../../ducks/createReducer';

import { getUser } from '../../ducks/userReducer';

import { updateLat, updateLng } from '../../ducks/locationReducer'

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dwvrok1le/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ncjyrxth';

class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      locationSelect: '',
      image: ''
    };
  }
  handleDateChange = date => {
    this.props.create.date = moment(date).format('YYYY-MM-DD');
  };

  handleTime = time => {
    this.props.create.time = time;
  };

  handleSubmit = id => {
    let { title, host, date, time, location, img, description } = this.props.create;
    let { users_id, name, email } = this.props.user;
    let { lat, lng } = this.props.location;

    axios
      .post(`/api/events`, {
        title,
        host,
        date,
        time,
        location,
        lat,
        lng,
        img,
        description,
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
      time,
      location,
      description
    });
  };

  onImageDrop = files => {
    this.handleImageUpload(files[0]);
  };

  handleImageUpload = file => {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.log(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          image: response.body.secure_url
        });
        this.props.updateImg(response.body.secure_url);
      }
    });
  };

  handleSelect = location => {
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.updateLat(latLng.lat);
        this.props.updateLng(latLng.lng);
        console.log(latLng)
      })
      .then(() => this.props.updateLocation(location))
      .catch(err => console.error('error, error'))
  }

  render() {
    const {
      updateEventName,
      updateHost,
      updateLocation,
      updateDescription
    } = this.props;
    const { auth_id } = this.props.user;
    const { date, location } = this.props.create;

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
          <label className="has-float-label">
            <input
              className="input_field"
              type="text"
              placeholder="Event Name"
              onChange={e => updateEventName(e.target.value)}
            />
            <span id='ce_title'>Event Name</span>
          </label>
          <label className="has-float-label">
            <input
              className="input_field"
              type="text"
              placeholder="Event Name"
              onChange={e => updateHost(e.target.value)}
            />
            <span id='ce_title'>Event Host</span>
          </label>
          <h1 className='ce_h1'>Date</h1>


            <DatePicker
              color="#296b3e"
              date={date}
              errorColor="#c32c27"
              handleDateChange={this.handleDateChange}
              hoverWeek
              inputStyle={{
                borderRadius: 0
              }}
              lightHeader
              required
              placeholder={day}
              minDate={today}
            />

          <h1 className='ce_h1'>Time</h1>

          <TimePicker
            showSecond={false}
            defaultValue={moment()}
            className="ce_time"
            onChange={this.handleTime}
            format={format}
            use12Hours
            style={{ width: 100 }}
          />

          <PlacesAutocomplete
            value={location}
            onChange={updateLocation}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
                <div className="location_container">
                  <label className="has-float-label">
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input'
                      })}
                    />
                    <span id='ce_title'>Location</span>
                  </label>
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

          <label className="has-float-label">
            <input
              className="input_field"
              type="text"
              placeholder="Description"
              onChange={e => updateDescription(e.target.value)}
            />
            <span id='ce_title'>Event Description</span>
          </label>

          <form>
            <h1 className='ce_h1'>Image Upload</h1>
            <div className="file_upload">
              <Dropzone
                onDrop={this.onImageDrop}
                multiple={false}
                accept="image/*"
                className="ce_image_dropzone"
              >
                <div>
                  {this.state.image === '' ? (
                    <p className="ce_dropzone_text">
                      Drop an image or click to select a file to upload.
                    </p>
                  ) : (
                      <div>
                        <img
                          className="ep_upload_pic"
                          src={this.state.image}
                          alt="event pic"
                        />
                      </div>
                    )}
                </div>
              </Dropzone>
            </div>
          </form>
          <Link to="/">
            <h1 className="ce_button" onClick={id => this.handleSubmit(id)}>
              Submit Event!
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
    updateLocation,
    updateImg,
    updateDescription,
    reset,
    getUser,
    updateLat,
    updateLng
  }
)(CreateEvent);
