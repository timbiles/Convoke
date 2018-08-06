import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Home.css';

import EventCard from '../EventCard/EventCard';

import { getEvents } from '../../ducks/eventReducer';
import { getUser, getEventsAttending } from '../../ducks/userReducer';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredEvents: []
    };
  }

  componentDidMount() {
    this.props.getUser().then(() => {
      this.props.getEventsAttending(this.props.user.users_id);
    });
  }

  handleChange = e => {
    this.setState({ filteredEvents: e.toLowerCase() });
  };
  

  render() {
    const { isLoading, events } = this.props;
    const { filteredEvents } = this.state;

    let filter = events.events
      .filter((e, i) => {
        return e.title.toLowerCase().includes(filteredEvents);
      })
      .map((e, i) => <EventCard eachEvent={e} key={i} />);

    let mapEvents = this.props.user.eventsAttending.map((e, i) => {
      return (
        <div className="hidden_side_events" key={i}>
          <Link className="home_selected_event" to={`/events/${e.title}`}>
            {e.title}
          </Link>
        </div>
      );
    });

    return (
      <Fragment>
        <div className="home_container">
          <h1 className="home_title">Convoke</h1>
          <div className="home_input_section">
            <input
              className="search_bar"
              placeholder="Search through Events"
              type="text"
              onChange={e => this.handleChange(e.target.value)}
            />
            <div className="home_dropdown_container">
              <h1>Categories</h1>
              <div className="home_dropdown">
                <h2>Party</h2>
                <h2>Concert</h2>
                <h2>Other...</h2>
              </div>
            </div>
          </div>
          <div className="home_linebreak" />
          {isLoading && <p>Loading...</p>}
          <div className="events_display">
            {filter}
            {!filter.length && (
              <div className="event_not_found">
                <h1> Ooops! We didn't find any event with that name!</h1>
              </div>
            )}
          </div>
          <div className="hidden_menu_arrow">
            <div className="hidden_menu_content">
              <h1>Quick Events List</h1>
              {mapEvents}
            </div>
            <input
              type="image"
              className="hidden_menu_img"
              src="https://image.flaticon.com/icons/svg/483/483345.svg"
              alt="hidden menu btn"
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser, getEvents, getEventsAttending }
)(Home);

/*
 SHORT CIRCUIT EVALUATION:
 &&=>
 VALUE ON LEFT IS TRUE, RETURN VALUE ON RIGHT
 VALUE ON LEFT IS FALSE, RETURN ITSELF

 ||=>
 VALUE ON LEFT IS FALSE, RETURN RIGHT VALUE;
 VALUE ON LEFT IS TRUE, RETURN ITSELF
*/
