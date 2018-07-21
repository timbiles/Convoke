import React, { Component } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';

import './Home.css';

// import EventCard from '../EventCard/EventCard';

// import { getEvents } from '../../ducks/eventReducer';

class Home extends Component {
  constructor(props) {
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

  //   handleChange = e => {
  //     this.setState({ filterEvents: e });
  //   };

  //   handleDelete = id => {
  //     axios.delete(`/api/events/${id}`).then(() => {
  //       this.getEvents();
  //     });
  //   };

  render() {
    let { events } = this.state;

    let eventsMap = events.map((e, i) => {
      return (
        <div className="events_display" key={i}>
          <h1>{e.title}</h1>
          <h3>{e.host}</h3>
          <h3>{e.date}</h3>
          {/* <button onClick={id => this.handleDelete(e.events_id)}>delete</button> */}
        </div>
      );
    });
    return (
      <div className="home_container">
        <div>
          <input size={60} placeholder="Search for an Event" type="text" />
        </div>
        <div className="events_container">{eventsMap}</div>
      </div>
    );
  }
}

// const mapStateToProps = state => state;

// export default connect(
//   mapStateToProps,
//   { getEvents }
// )(Home);

export default Home;