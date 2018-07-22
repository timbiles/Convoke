import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';

import './Home.css';

import EventCard from '../EventCard/EventCard';

import { getEvents } from '../../ducks/eventReducer';

class Home extends Component {
  componentDidMount() {
    this.props.getEvents();
  }

  // getEvents = () => {
  //   axios.get('/api/events').then(res => {
  //     console.log(res);
  //     this.setState({ events: res.data });
  //   });
  // };

  //   handleChange = e => {
  //     this.setState({ filterEvents: e });
  //   };

  //   handleDelete = id => {
  //     axios.delete(`/api/events/${id}`).then(() => {
  //       this.getEvents();
  //     });
  //   };

  render() {
    const { isLoading, events } = this.props;
    console.log(events)

    return (
      <div className="home_container">
        <div>
          <input className='search_bar' placeholder="Search for an Event" type="text" />
        </div>
        {isLoading && <p>Loading...</p>}

        {events[0] &&
          events.map((e, i) => (
            <EventCard
              events={e}
              key={i}
              // text="Add To Cart"
              // handleCardButtonClick={this.props.addToCart}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getEvents }
)(Home);

// export default Home;