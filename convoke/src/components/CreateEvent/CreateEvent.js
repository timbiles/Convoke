import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert2';
import DatePicker from 'react-custom-date-picker';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

import './CreateEvent.css';
import 'rc-time-picker/assets/index.css';

import ImageUploader from '../Tools/ImageUploader/ImageUploader';
import Location from '../Tools/Location/Location';

import {
  updateEventName,
  updateHost,
  updateDate,
  updateTime,
  updateDescription,
  updateImg,
  reset
} from '../../ducks/createReducer';

import { getUser } from '../../ducks/userReducer';

import { updateLat, updateLng } from '../../ducks/locationReducer';

class CreateEvent extends Component {
  handleDateChange = date => {
    this.props.create.date = moment(date).format('YYYY-MM-DD');
  };

  handleTime = time => {
    this.props.create.time = time;
  };

  refreshPage = () => {
    window.location.reload();
  };

  handleSubmit = id => {
    let {
      title,
      host,
      date,
      time,
      location,
      img,
      description
    } = this.props.create;
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
    axios
      .post(`/api/email`, {
        email,
        name,
        title,
        date,
        time,
        location,
        description
      })
  };

  render() {
    const {
      updateEventName,
      updateHost,
      updateDescription,
      updateImg
    } = this.props;
    const { auth_id, name } = this.props.user;
    const { date, location } = this.props.create;

    const format = 'h:mm a';
    const day = moment().format('MM/DD/YYYY');
    const today = new Date();

    return (
      <div className="create_event_container">
        {!auth_id.length ? (
          <div className="ce_setup_container">
            <h1 className="ce_setup_title">
              You have to login to Create an Event!
            </h1>
            <a className="link" href={process.env.REACT_APP_LOGIN}>
              <h1 className="ce_link">Login</h1>
            </a>
          </div>
        ) : !name ? (
          <div className="ce_setup_container">
            <div>
              <h2 className="ce_setup_title ce_big">Oops!</h2>
              <h2 className="ce_setup_title">
                You must finish setting up your account before creating an
                Event.
              </h2>
            </div>
            <Link className="link" to="/editprofile">
              <h3 className="ce_link">Complete Profile Set up</h3>
            </Link>
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
              <span id="ce_title">Event Name</span>
            </label>
            <label className="has-float-label">
              <input
                className="input_field"
                type="text"
                placeholder="Event Name"
                onChange={e => updateHost(e.target.value)}
              />
              <span id="ce_title">Event Host</span>
            </label>
            <h1 className="ce_h1">Date</h1>

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

            <h1 className="ce_h1">Time</h1>

            <TimePicker
              showSecond={false}
              defaultValue={moment()}
              className="ce_time"
              onChange={this.handleTime}
              format={format}
              use12Hours
              style={{ width: 100 }}
            />

            <Location location={location} />

            <label className="has-float-label">
              <input
                className="input_field"
                type="text"
                placeholder="Description"
                onChange={e => updateDescription(e.target.value)}
              />
              <span id="ce_title">Event Description</span>
            </label>

            <form>
              <h1 className="ce_h1">Image Upload</h1>
              <div className="file_upload">
                <ImageUploader updateImg={updateImg} />
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
    updateDescription,
    updateImg,
    reset,
    getUser,
    updateLat,
    updateLng
  }
)(CreateEvent);
