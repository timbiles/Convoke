import React, { Component, Fragment } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';

import './Home.css';

import EventCard from '../EventCard/EventCard';


import { getEvents } from '../../ducks/eventReducer';

class Home extends Component {
  
  componentDidMount() {
    this.props.getEvents();
  }



  render() {
    const { isLoading, events } = this.props;

    return (
      <Fragment>
        <div className="home_container">
          <div>
            <input
              className="search_bar"
              placeholder="Search for an Event"
              type="text"
              onChange={e => this.handleChange(e.target.value)}
            />
          </div>
          {isLoading && <p>Loading...</p>}
          <div className="events_display">
            {events.events.map((e, i) => (
                <EventCard
                  events={e}
                  key={i}
                />
              ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getEvents }
)(Home);
