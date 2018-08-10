import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Weather.css';

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

  componentDidMount() {
    this.getWeather();
  }

  getWeather = async () => {
    const { event } = this.props;

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${event.lat}&lon=${
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
            currentTemp:
              Math.round(((data.main.temp - 273.15) * 9) / 5) + 32 + '°',
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
          <div className="weather_container">
            <div className="weather_card">
              <img
                className="weather_icon"
                src={this.state.weatherIcon}
                alt="Weather icon"
              />
              <div className="weather_conditions">
                <p className="weather_text weather_degree">
                  {this.state.currentTemp}
                </p>
                <p className="weather_text">
                  {this.state.currentConditionDescription}
                </p>
              </div>
              <div className="condition_details">
                <p className="weather_text">Humidity: {this.state.humidity}</p>
                <p className="weather_text">Wind Speed: {this.state.wind} </p>
              </div>
            </div>
            <h4 className="weather_text"> Location | {this.state.cityName} </h4>
          </div>
        </div>
      );

    // const LoadingDisplay = (
    //   <div className="loading">
    //     <img
    //       className="loadingIcon"
    //       src="https://image.flaticon.com/icons/svg/25/25220.svg"
    //       alt="loading icon"
    //     />
    //   </div>
    // );

    const LoadingDisplay = (
      <div className="loading">
        <div className="loading_bar" />
        <div className="loading_bar" />
        <div className="loading_bar" />
        <div className="loading_bar" />
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
