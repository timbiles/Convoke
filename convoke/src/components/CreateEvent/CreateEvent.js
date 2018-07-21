import React, { Component } from 'react';
import { connect } from 'react-redux';

// import './CreateEvent.css';

import { getEvents } from '../../ducks/eventReducer';

class CreateEvent extends Component {
  componentDidMount() {
    // this.props.getEvents();
  }
  render() {
      console.log(this.props)
    return (
      <div>
        <h1>CreateEvent</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    event: state.eventReducer
  };
};

export default connect(
  mapStateToProps,
  { getEvents }
)(CreateEvent);
