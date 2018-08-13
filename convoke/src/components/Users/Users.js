import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getAllUsers } from '../../ducks/userReducer';

import './Users.css';

class Users extends Component {

  render() {

    let id = Number(this.props.match.params.users_id)

    let user =
      this.props.user.users.find(
        e => e.users_id === id
      ) || false;

    const created = this.props.events.events.filter(e => {
      return e.users_id === id
    });

    return (
      <div className="users_container">
        <div className="profile_info">
          <div className="users_left">
            <p className="mc_profile_name">{user.name}</p>
            <div className="img-email-edit">
              <div className="mc_prof_img">
                <img
                  className="profile_display_img"
                  src={user.img}
                  alt={user.auth_id}
                />
                <Link to="/">
                  <h3 className="back_to_events">Back to Events Listing</h3>
                </Link>
              </div>

              <div className="email_and_img_edit">
                <h3 className='users_text'>Email</h3>
                <p>{user.email}</p>
                <h3 className='users_text'>Home Town</h3>
                <p>{user.home_town}</p>
                <h3 className='users_text'>Member Since</h3>
                <p>{moment(user.membership_date).format('MMM YYYY')}</p>
              </div>
            </div>
            <h3 className='users_text'>Bio</h3>
            <p className="profile_bio">{user.bio}</p>
            {/* <Link className="edit_profile_link" to="/editprofile">
                  Edit Profile
                </Link> */}
          </div>
          <div className="profile_right">
            <h1 className="profile_dropdown">Created Events</h1>
                <h1 className="profile_created_events">
                  {created.map((e, i) => {
                    return (
                      <div key={i} className="create_map">
                        <Link className="create_map" to={`/events/${e.title}`}>
                          <h1 className="create_map_sub">{e.title}</h1>
                        </Link>
                      </div>
                    );
                  })}
                </h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getAllUsers
  }
)(Users);
