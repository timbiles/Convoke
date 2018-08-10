import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Weather extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      currentTemp: '',
      humidity: '',
      wind: '',
      windDirection: '',
      currentCondition: '',
      currentConditionDescription: '',
      weatherIcon: '',
      cityName: '',
      cityNotFound: ''
    };
  }

  componentDidMouth() {
    // var event =
    // this.props.events.events.find(
    //   e => e.title === this.props.match.params.title
    // ) || false;

    this.getWeather();
  }

  getWeather = async () => {
    // var event =
    //   this.props.events.events.find(
    //     e => e.title === this.props.match.params.title
    //   ) || false;

    const {event} = this.props.events

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${event.lat}&lon=${
        event.lng
      }&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );

    const data = await api_call
      .json()

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

    console.log(this.state);
  };

  render() {
    //   console.log(this.props)
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

    return <div>{CurrentWeatherCard}</div>;
  }
}

export default Weather;
