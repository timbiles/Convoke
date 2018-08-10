import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import swal from 'sweetalert2';
import axios from 'axios';
import ContentEditable from 'react-contenteditable';
import DatePicker from 'react-custom-date-picker';
import TimePicker from 'rc-time-picker';

import Map from '../Map/Map';
// import Weather from '../Weather/Weather';
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

// const weatherApi = process.env.WEATHER_API_KEY;

// const CLOUDINARY_UPLOAD_URL =
//   'https://api.cloudinary.com/v1_1/dwvrok1le/upload';
// const CLOUDINARY_UPLOAD_PRESET = 'ncjyrxth';

class Events extends Component {
  constructor(props) {
    super();
    this.state = {
      //event info
      eventId: '',
      title: '',
      host: '',
      date: '',
      time: '',
      description: ''
      //weather info
    //   isLoading: true,
    //   currentTemp: '',
    //   humidity: '',
    //   wind: '',
    //   windDirection: '',
    //   currentCondition: '',
    //   currentConditionDescription: '',
    //   weatherIcon: '',
    //   cityName: '',
    //   cityNotFound: ''
    };
  }

  componentDidMount() {
    var event =
      this.props.events.events.find(
        e => e.title === this.props.match.params.title
      ) || false;

    this.setState({
      eventId: event.events_id,
      title: event.title,
      host: event.host,
      date: event.date,
      time: event.time,
      description: event.description
    });

    this.getWeather();
      
    console.log(event);
  }

  getWeather = async () => {
    var event =
      this.props.events.events.find(
        e => e.title === this.props.match.params.title
      ) || false;

      console.log(process.env.REACT_APP_WEATHER_API_KEY)

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${event.lat}&lon=${
        event.lng
      }&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );

    const data = await api_call.json() 
    
    .then(data => {
      if (data.cod === 404) {
        this.setState({
          isLoading: false,
          cityNotFound: '404'
        });
      } else {
        // Determine weather icon
        console.log(data);

        let weatherId = data.weather[0].id;

        if (weatherId <= 232) {
          this.setState({
            weatherIcon: 'https://image.flaticon.com/icons/svg/899/899747.svg'
          });
        } else if (weatherId >= 300 && weatherId <= 531) {
          this.setState({
            weatherIcon: 'https://image.flaticon.com/icons/svg/106/106059.svg'
          });
        } else if (weatherId >= 600 && weatherId <= 622) {
          this.setState({
            weatherIcon: 'https://image.flaticon.com/icons/svg/481/481461.svg'
          });
        } else if (weatherId === 800) {
          this.setState({
            weatherIcon: 'https://image.flaticon.com/icons/svg/606/606795.svg'
          });
        } else if (weatherId >= 801 && weatherId <= 804) {
          this.setState({
            weatherIcon: 'https://image.flaticon.com/icons/svg/861/861076.svg'
          });
        }
        this.setState({
          isLoading: false,
          currentTemp: Math.round(data.main.temp) + '°',
          humidity: data.main.humidity + '%',
          wind: Math.round(data.wind.speed) + ' mph',
          windDirection: data.wind.deg,
          currentCondition: data.weather[0].main,
          currentConditionDescription: data.weather[0].description,
          cityName: data.name
        });
      }
    })
    .catch(err => {
      console.log(err);
    });

    console.log(this.state)
    
  };

  handleClick = val => {
    axios
      .post(`/api/add-event/${val}/${this.props.user.users_id}`)

      .then(res => {
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Added to MyConvoke',
          // imageUrl:
          //   'http://images.hellogiggles.com/uploads/2015/09/17/bill_murray.jpg',
          // imageWidth: 175,
          // imageHeight: 250,
          // imageAlt: 'Custom image',
          showConfirmButton: false,
          timer: 1500
        });
      });
  };

  handleInputs = (val, state) => {
    this.setState({
      [state]: val
    });
  };

  handleDateChange = date => {
    this.setState({
      date: moment(date).format('YYYY-MM-DD')
    });
  };

  handleTime = time => {
    this.setState({
      time: time
    });
  };

  handleSubmit = event => {
    let { eventId, title, host, date, time, description } = this.state;
    this.props
      .updateEventInfo(eventId, title, host, date, time, description)
      .then(() => {
        this.props.getEvents();
      });
  };

  render() {
    const { events } = this.props;
    const { userEvents } = this.props.userEvents;
    let { title, host, description } = this.state;

    let event =
      events.events.find(e => e.title === this.props.match.params.title) ||
      false;

    let mapped = _.mapValues(userEvents, function(e) {
      return e.events_id;
    });

    let filter = _.filter(mapped, function(e) {
      return e === event.events_id;
    }).length;

    let one = filter === 1 ? ' person is going' : ' people going';
    let date = String(event.date);
    let time = String(event.time);
    let day = moment(event.date).format('MM/DD/YYYY');
    let today = new Date();
    const format = 'h:mm a';

    let attending = this.props.user.eventsAttending.filter(e => {
      return e.events_id === event.events_id;
    });

    //weather display
    const WeatherCardError = (
      <div className="weatherCardContainer">
        <div className="weatherCardError">
          <img
            src="https://image.flaticon.com/icons/svg/31/31551.svg"
            alt="no location found"
          />
          <p> Whoa! Looks like there was an error with your zipcode.</p>
          <Link to="/">
            <button>Try Again</button>
          </Link>
        </div>
      </div>
    );

    const WeatherConditions =
      this.state.cityNotFound == 404 ? (
        <div> {WeatherCardError} </div>
      ) : (
        <div>
          <div className="homeBtn">
            <Link to="/">
              <button>Home</button>
            </Link>
          </div>
          <div className="weatherCardContainer">
            <div className="weatherCard">
              <img src={this.state.weatherIcon} alt="Weather icon" />
              <div className="conditionsOverview">
                <p>{this.state.currentTemp}</p>
                <p>{this.state.currentConditionDescription}</p>
              </div>
              <div className="conditionDetails">
                <p>Humidity: {this.state.humidity} </p>
                <p>Wind Speed: {this.state.wind} </p>
              </div>
            </div>
            <h4> Location | {this.state.cityName} </h4>
          </div>
        </div>
      );

    const LoadingDisplay = (
      <div className="loading">
        <img
          className="loadingIcon"
          src="https://image.flaticon.com/icons/svg/25/25220.svg"
          alt="loading icon"
        />
      </div>
    );

    const CurrentWeatherCard =
      this.state.isLoading === true ? (
        <div> {LoadingDisplay} </div>
      ) : (
        <div> {WeatherConditions} </div>
      );

    return (
      <div className="ie_container">
        {!event ? (
          <h1>USER NOT FOUND</h1>
        ) : this.props.user.users_id === event.users_id ? (
          <div className="events_viewbox">
            <ContentEditable
              html={title}
              onChange={e => this.handleInputs(e.target.value, 'title')}
              className="events_editable_big"
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
                    onChange={e => this.handleInputs(e.target.value, 'host')}
                    className="events_editable"
                  />
                  <h3>
                    <img
                      className="eventcard_icon"
                      src="https://image.flaticon.com/icons/svg/25/25393.svg"
                      alt="calendar"
                    />{' '}
                    {moment(event.date).format('dddd MMM Do, YYYY')}
                  </h3>

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

                  <h3>
                    <img
                      className="eventcard_icon"
                      src="https://image.flaticon.com/icons/svg/61/61227.svg"
                      alt="clock"
                    />{' '}
                    {moment(time).format('h:mm a')}
                  </h3>

                  <TimePicker
                    showSecond={false}
                    defaultValue={moment()}
                    className="ce_time"
                    onChange={this.handleTime}
                    format={format}
                    use12Hours
                    style={{ width: 100 }}
                  />

                  <h3>
                    <img
                      className="eventcard_icon"
                      src="https://image.flaticon.com/icons/svg/33/33622.svg"
                      alt="map marker"
                    />{' '}
                    {event.location}
                  </h3>
                </div>
                <div className="ie_info_two">
                  <h2>Event Description</h2>
                  <ContentEditable
                    html={description}
                    onChange={e =>
                      this.handleInputs(e.target.value, 'description')
                    }
                    className="events_editable"
                  />
                </div>
                <div className="events_attend_container">
                  {attending.length === 0 ? (
                    <h5
                      className="events_attend events_attend_link"
                      onClick={e => this.handleClick(event.events_id)}
                    >
                      Attend
                    </h5>
                  ) : (
                    <h5 className="events_attend">You're already going!</h5>
                  )}
                </div>
              </div>
              <h5
                className="ep_submit_btn"
                onClick={() => this.handleSubmit(event.events_id)}
              >
                Submit Edit
              </h5>
            </div>
            <div className="events_map">
              <Map
                lat={event.lat}
                lng={event.lng}
                center={{
                  lat: event.lat,
                  lng: event.lng
                }}
              />
            </div>
            <div>{CurrentWeatherCard}</div>
            {/* <Weather event={event}/> */}
            
          </div>
        ) : (
          <div className="events_viewbox">
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
                  <h3>
                    <img
                      className="eventcard_icon"
                      src="https://image.flaticon.com/icons/svg/25/25393.svg"
                      alt="calendar"
                    />{' '}
                    {moment(event.date).format('dddd MMM Do, YYYY')}
                  </h3>

                  <h3>
                    <img
                      className="eventcard_icon"
                      src="https://image.flaticon.com/icons/svg/61/61227.svg"
                      alt="clock"
                    />{' '}
                    {moment(event.time).format('h:mm a')}
                  </h3>

                  <h3>
                    <img
                      className="eventcard_icon"
                      src="https://image.flaticon.com/icons/svg/33/33622.svg"
                      alt="map marker"
                    />{' '}
                    {event.location}
                  </h3>
                </div>
                <div className="ie_info_two">
                  <h2>Event Description</h2>
                  <h4>{event.description}</h4>
                  <div className="events_attend_container">
                    {attending.length === 0 ? (
                      <h5
                        className="events_attend events_attend_link"
                        onClick={e => this.handleClick(event.events_id)}
                      >
                        Attend
                      </h5>
                    ) : (
                      <h5 className="events_attend">You're signed up!</h5>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="events_map">
              <Map
                lat={event.lat}
                lng={event.lng}
                center={{
                  lat: event.lat,
                  lng: event.lng
                }}
              />
            </div>
            <div>{CurrentWeatherCard}</div>
            {/* <Weather event={event}/> */}
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
