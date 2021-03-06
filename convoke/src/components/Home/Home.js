import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Delay from 'react-delay';

import './Home.css';
import EventCard from '../EventCard/EventCard';
import EventListView from '../EventListView/EventListView';
import bamboo from './bamboo.mp3';


import { getUser } from '../../ducks/userReducer';

class Home extends Component {
  state = {
    filteredEvents: [],
    blockView: false,
    listView: true
  };

  handleChange = e => {
    this.setState({ filteredEvents: e.toLowerCase() });
  };

  toggleList = () => {
    this.setState({ listView: true });
    this.setState({ blockView: false });
  };

  toggleBlock = () => {
    this.setState({ blockView: true });
    this.setState({ listView: false });
  };

  render() {
    const { isLoading, events } = this.props;
    const { eventsAttending, auth_id, name } = this.props.user;
    const { filteredEvents, blockView, listView } = this.state;

    let filter = events.events
      .filter((e, i) => {
        return e.title.toLowerCase().includes(filteredEvents);
      })
      .map((e, i) => <EventCard eachEvent={e} key={i} />);

    let filter2 = events.events
      .filter((e, i) => {
        return e.title.toLowerCase().includes(filteredEvents);
      })
      .map((e, i) => <EventListView eachEvent={e} key={i} />);

    return (
      <Fragment>
        <div className="home_container">
          <h1 className="home_title">Convoke.</h1>
          <div className="home_input_section">
            {listView === true ? (
              <img
                className="home_menu_icon icon_shade"
                src="https://image.flaticon.com/icons/svg/114/114320.svg"
                onClick={this.toggleList}
                alt="List view"
              />
            ) : (
              <img
                className="home_menu_icon"
                src="https://image.flaticon.com/icons/svg/114/114320.svg"
                onClick={this.toggleList}
                alt="List view"
              />
            )}

            {blockView === true ? (
              <img
                className="home_menu_icon icon_shade"
                src="https://image.flaticon.com/icons/svg/566/566001.svg"
                onClick={this.toggleBlock}
                alt="Block view"
              />
            ) : (
              <img
                className="home_menu_icon"
                src="https://image.flaticon.com/icons/svg/566/566001.svg"
                onClick={this.toggleBlock}
                alt="Block view"
              />
            )}

            <label className="has-float-label">
              <input
                className="search_bar"
                type="text"
                placeholder=". . ."
                onChange={e => this.handleChange(e.target.value)}
              />
              <span className="search_span">Search Events</span>
            </label>
          </div>
          <div className="home_linebreak" />
          {isLoading && <p>Loading...</p>}
          {this.state.listView && (
            <div className="home_listview">
              {filter2}
              {!filter.length && (
                <div className="event_not_found">
                  <h1> Ooops! We didn't find any event with that name!</h1>
                </div>
              )}
            </div>
          )}
          {this.state.blockView && (
            <div className="events_display">
              {filter}
              {!filter.length && (
                <div className="event_not_found">
                  <h1> Ooops! We didn't find any event with that name!</h1>
                </div>
              )}
            </div>
          )}
          <div className="hidden_menu_arrow">
            <div className="hidden_menu_content">
              <h1>Quick Events List</h1>

              {eventsAttending.map((e, i) => {
                return (
                  <div className="hidden_side_events" key={i}>
                    <Link
                      className="home_selected_event"
                      to={`/events/${e.title}`}
                    >
                      {e.title}
                    </Link>
                  </div>
                );
              })}
            </div>
            <input
              type="image"
              className="hidden_menu_img"
              src="https://image.flaticon.com/icons/svg/483/483345.svg"
              alt="hidden menu btn"
            />
          </div>

          {auth_id.length
            ? !name && (
                <div className="profile_setup">
                  <div className="home_bubble">
                    <h1 className="bubble_text">Welcome to Convoke!</h1>
                    <Link className="bubble_text" to="/editprofile">
                      <h2 className="click_here">
                        Click here to set up your profile!
                      </h2>
                    </Link>
                  </div>
                  <img
                    className="clippy"
                    src="http://images1.wikia.nocookie.net/__cb20110716185610/central/images/c/cb/Clippy.png"
                    alt="clippy"
                  />
                  <Delay wait={2000}>
                    <audio src={bamboo} autoPlay />
                  </Delay>
                </div>
              )
            : null}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser }
)(Home);
