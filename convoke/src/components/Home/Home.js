import React, { Component, Fragment } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';

import './Home.css';

import EventCard from '../EventCard/EventCard';

import { getEvents } from '../../ducks/eventReducer';

class Home extends Component {
  componentDidMount() {
    this.props.getEvents();
    // console.log(getEvents());
  }

  //   handleChange = e => {
  //     this.setState({ filterEvents: e });
  //   };

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
            />
          </div>
          {isLoading && <p>Loading...</p>}
          <div className="events_display">
            {events.events.map((e, i) => (
                <EventCard
                  events={e}
                  key={i}
                  // text="Add To Cart"
                  // handleCardButtonClick={this.props.addToCart}
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
