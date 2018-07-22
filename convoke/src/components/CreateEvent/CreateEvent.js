import React, { Component } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';

import './CreateEvent.css';

// import { createEvent } from '../../ducks/eventReducer';

class CreateEvent extends Component {
  componentDidMount() {
    this.createEvents();
  }

  createEvents = () => {
      axios.post('/api/events')
  }



  render() {

    return (
      <div className='create_event_container'>
        <h1>CreateEvent</h1>
      </div>
    );
  }
}


export default CreateEvent;

// const mapStateToProps = state => {
//   return {
//     event: state.eventReducer
//   };
// };

// export default connect(
//   mapStateToProps,
//   { createEvent }
// )(CreateEvent);
