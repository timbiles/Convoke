import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import swal from 'sweetalert2';

import './Invite.css';

import { getAllUsers } from '../../../ducks/userReducer';

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

Modal.setAppElement(document.getElementById('root'));

class Invite extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }

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

  handleClick = e => {
    const { title } = this.props.currentEvent;
    swal({
      type: 'success',
      title: 'Message Sent!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      axios.post(`/api/invite-email`, {
        email: e.email,
        name: e.name,
        title,
        senderName: this.props.user.name
      });
    });

    console.log(e);
  };

  render() {
    const { users } = this.props.user;

    const userMap = users.map(
      e =>
        e.users_id !== this.props.user.users_id && (
          <div
            onClick={() => this.handleClick(e)}
            className="invite_holder"
            key={e.users_id}
          >
            <h1>{e.name}</h1>
            <img className="invite_img" src={e.img} alt={e.name} />
          </div>
        )
    );

    return (
      <div>
        <h1 className="elv_invite" onClick={this.openModal}>
          Invite
        </h1>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div>
            <h1 className="invite_text">
              Click someone to Invite them to this event!
            </h1>

            <div className="invite_people_map">{userMap}</div>
          </div>
        </Modal>
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
)(Invite);
