import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal'
import swal from 'sweetalert2';
import _ from 'lodash';

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

class Invite extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleClick = () => {
        // axios.post(`/api/invite-email`, {
        //     email
        //     
        // }).then(() => {

        //     swal({
        //         type: 'success',
        //         title: 'Button worked',
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        // })
    }


    render() {
        const { users } = this.props.user

        const userMap = users.map((e, i) => {
            return <div className='invite_holder' key={i}>
                <h1 onClick={this.handleClick()}>{e.name}</h1>
                <img className='invite_img' src={e.img} alt={e.name} />
            </div>
        })

        console.log(userMap)

        return (
            <div>
                <h1 className='elv_invite' onClick={this.openModal}>Invite</h1>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >

                    <div>
                        <h1 className='invite_text'>Invite people to this event!</h1>

                        <div className='invite_people_map'>

                            {userMap}
                        </div>
                    </div>

                </Modal>


            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    {
        getAllUsers
    }
)(Invite);