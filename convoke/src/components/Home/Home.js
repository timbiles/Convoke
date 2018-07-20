import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './Home.css';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      filterEvents: [],
      events: []
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    axios.get('/api/events').then(res => {
      console.log(res);
      this.setState({ events: res.data });
    });
  };

  handleChange = e => {
    this.setState({ filterEvents: e });
  };

  handleDelete = id => {
    axios.delete(`/api/events/${id}`).then(() => {
      this.getEvents();
    });
  };

  render() {
    let { events } = this.state;

    let eventsMap = events.map((e, i) => {
      return (
        <div className="events_display" key={i}>
          <div>{e.title}</div>
          <div>{e.host}</div>
          <div>{e.date}</div>
          <button onClick={id => this.handleDelete(e.events_id)}>delete</button>
        </div>
      );
    });

    return (
      <Fragment>
        <div className="home_container">
          <div>
            <input
              onChange={e => this.handleChange(e.target.value)}
              size={60}
              placeholder="Search for an Event"
              type="text"
            />
          </div>
          <div className="events_container">{eventsMap}</div>
        </div>
      </Fragment>
    );
  }
}
