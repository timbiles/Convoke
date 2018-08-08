import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import ContentEditable from 'react-contenteditable';

import Map from '../Map/Map';
import './Events.css';

import {
  getEvents,
  getEvent,
  updateTitle,
  updateHost,
  updateDate,
  updateTime,
  updateDescription,
  updateEventInfo
} from '../../ducks/eventReducer';
// import pic from '../EventCard/person.png';

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dwvrok1le/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ncjyrxth';

class Events extends Component {
  constructor(props) {
    super();
    this.state = {
      eventId: "",
      title: "",
      host: "",
      date: "",
      time: "",
      description: ""
    }
  }

  componentDidMount() {
    var event =
      this.props.events.events.find(e => e.title === this.props.match.params.title) ||
      false;

    this.setState({
      eventId: event.events_id,
      title: event.title,
      host: event.host,
      date: event.date,
      time: event.time,
      description: event.description
    })
  }

  handleInputs = (val, state) => {
    this.setState({
      [state]: val
    })
  }

  handleSubmit = event => {
    let { eventId, title, host, date, time, description } = this.state;
    this.props.updateEventInfo(eventId, title, host, date, time, description).then(() => {
      this.props.getEvents();
    })
  };

  render() {
    const { events } = this.props;
    let { title, host, description } = this.state;
    let event =
      events.events.find(e => e.title === this.props.match.params.title) ||
      false;

    const { userEvents } = this.props.userEvents;

    let mapped = _.mapValues(userEvents, function (e) {
      return e.events_id;
    });

    let filter = _.filter(mapped, function (e) {
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
    let date = String(event.date);
    let time = String(event.time);

    return (
      <div className="ie_container">
        {!event
          ? <h1>USER NOT FOUND</h1> : (


            this.props.user.users_id === event.users_id ? 


            <div className='events_viewbox'>
              <ContentEditable
                      html={title}
                      onChange={e => this.handleInputs(e.target.value, "title")}
                      className='events_editable_big'
                    />
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
                    <ContentEditable
                      html={host}
                      onChange={e => this.handleInputs(e.target.value, "host")}
                      className='events_editable'
                    />
                    <h3>{moment(event.date).format('dddd MMM Do, YYYY')}</h3>
                    <input
                      placeholder={moment(date).format('MM/DD/YYYY')}
                      type="text"
                      className="something_1"
                      onChange={e => this.handleInputs(e.target.value, "date")}
                    />
                    <h3>
                      {moment(time).format('h:mm a')}
                    </h3>
                    <input
                      placeholder={time}
                      type="text"
                      className="something_1"
                      onChange={e => this.handleInputs(e.target.value, "time")}
                    />
                    <h3>{event.location}</h3>
                  </div>
                  <div className="ie_info_two">
                    <h2>Event Description</h2>
                    <ContentEditable
                      html={description}
                      onChange={e => this.handleInputs(e.target.value, "description")}
                      className='events_editable'
                    />
                  </div>
                </div>
                <h5
                  className="ep_submit_btn"
                  onClick={() => this.handleSubmit(event)}
                >
                  Submit Edit
                </h5>
              </div>
              <div className='events_map'>

                <Map
                  lat={event.lat}
                  lng={event.lng}
                  center={{
                    lat: event.lat,
                    lng: event.lng
                  }}
                />
              </div>
            </div>

            
            : 

            <div className='events_viewbox'>
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

                    <h3 >{event.host}</h3>
                    
                    <h3>{moment(event.date).format('dddd MMM Do, YYYY')}</h3>
                    
                    <h3>
                      {moment(event.time).format('h:mm a')}
                    </h3>
                    
                    <h3>{event.location}</h3>
                  </div>
                  <div className="ie_info_two">
                    <h2>Event Description</h2>
                    <h4>{event.description}</h4>
                    
                  </div>
                </div>
                
              </div>
              <div className='events_map'>

                <Map
                  lat={event.lat}
                  lng={event.lng}
                  center={{
                    lat: event.lat,
                    lng: event.lng
                  }}
                />
              </div>
            </div>


          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getEvents,
    getEvent,
    updateTitle,
    updateHost,
    updateDate,
    updateTime,
    updateDescription,
    updateEventInfo
  }
)(Events);
