import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Profile.css';

import { getUser, getEventsAttending } from '../../ducks/userReducer';
import { removeEvent } from '../../ducks/eventReducer';

class Profile extends Component {
  componentDidMount() {
    this.props.getEventsAttending(this.props.user.users_id);
  }

  // getEventsAttending = () => {
  //   console.log(this.props.user.users_id);
  //   axios.get(`/api/events/${this.props.user.users_id}`).then(res => {
  //     console.log(res.data);
  //     this.setState({ eventsAttending: res.data });
  //   });
  // };

  handleDelete = id => {
    axios.delete(`/api/delete/${id}/${this.props.user.users_id}`).then(res => {
      this.props.getEventsAttending(this.props.user.users_id);
    });
  };

  render() {
    const { auth_id, name, email, home_town, img, bio } = this.props.user;

    return (
      <div className="mc_container">
        <div className="mc_display">
          {!auth_id.length ? (
            <div>
              <h2>Oops! Don't forget to Login!</h2>
              <a className="mc_link" href={process.env.REACT_APP_LOGIN}>
                <h1 className="mc_login_btn">Login</h1>
              </a>
            </div>
          ) : (
            <div>
              <p className="mc_profile_name">{name}</p>
              <div className="img-email-edit">
                <img className="profile_display_img" src={img} alt={auth_id} />

                <div className="email_and_img_edit">
                  <h3>Email</h3>
                  <p>{email}</p>
                  <h3>Home Town</h3>
                  <p>{home_town}</p>
                </div>
              </div>
              <h3>Bio</h3>
              <p>{bio}</p>
              <Link className="" to="/editprofile">
                Edit Profile
              </Link>
            </div>
          )}
        </div>

        <div className="mc_events_display">
          {this.props.user.eventsAttending.map((e, i) => {
            return (
              <div className="mc_events_cards" key={e.id}>
                <div className="mc_name_and_img">
                  <Link to={`/events/${e.title}`}>
                    <h1 className='mc_selected_title'>{e.title}</h1>
                  </Link>

                  <img className="mc_events_img" src={e.img} alt={e.title} />
                </div>
                <p>{e.host}</p>
                <p>
                  {e.date.substring(5, 10).replace(/-/g, '/')}/{e.date.substring(
                    0,
                    4
                  )}
                </p>
                <p>
                  {e.time[0] === '0'
                    ? e.time.substring(1, 5)
                    : e.time.substring(0, 5)}
                </p>
                <p>{e.location.substring(0, e.location.length - 5)}</p>
                <button
                  onClick={id => {
                    this.handleDelete(e.events_id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUser,
    removeEvent,
    getEventsAttending
  }
)(Profile);

// fix css
