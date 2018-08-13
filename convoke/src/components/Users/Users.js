import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert2';
import Modal from 'react-modal';

import { getAllUsers } from '../../ducks/userReducer';

import './Users.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Users extends Component {
  state = {
    message: '',
    modalIsOpen: false
  };

  handeChange = e => {
    this.setState({ message: e });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleClick = user => {
    const { email, name } = user;

    swal({
      type: 'success',
      title: `Message sent to ${user.name}!`,
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      axios.post(`/api/send-email`, {
        userEmail: this.props.user.email,
        email,
        name,
        sender: this.props.user.name,
        message: this.state.message
      });
    });
    this.closeModal();
  };

  render() {
    let id = Number(this.props.match.params.users_id);

    let user = this.props.user.users.find(e => e.users_id === id) || false;

    const created = this.props.events.events.filter(e => {
      return e.users_id === id;
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
                <h3 className="users_text">Email</h3>
                <p>{user.email}</p>
                <h3 className="users_text">Home Town</h3>
                <p>{user.home_town}</p>
                <h3 className="users_text">Member Since</h3>
                <p>{moment(user.membership_date).format('MMM YYYY')}</p>
              </div>
            </div>
            <h3 className="users_text">Bio</h3>
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
        {user.users_id !== this.props.user.users_id && (
          <div className="user_email_box">
            <h2 onClick={this.openModal}>Send Message</h2>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
            >
              <div className="users_modal">
                <h2 className="users_modal_title">
                  Write a message to {user.name}!
                </h2>
                <input
                  className="modal_input"
                  onChange={e => this.handeChange(e.target.value)}
                  type="text"
                />
                <h2
                  className="users_modal_text"
                  onClick={() => this.handleClick(user)}
                >
                  Send Message
                </h2>
              </div>
            </Modal>
          </div>
        )}
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
