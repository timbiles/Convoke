import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';


import './Connect.css';
import { getAllUsers } from '../../ducks/userReducer';

class Connect extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { users } = this.props.user;

    let map = _.mapValues(users, function(e) {
      return e.img
    });

    let filter = _.filter(map, function(e) {
        return e
    })

    // let map = users.map((e,i) => {
    //     return (
    //         <div key={i}>
    //             e.img.source
    //         </div>
    //     )
    // })

    console.log(filter)

    return (
      <div className="connect_container">
        <h1>Connect</h1>
        {/* <div className="connect_sidebar"><img className='connect_img' src={filter} alt="user profile"/></div> */}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getAllUsers }
)(Connect);
