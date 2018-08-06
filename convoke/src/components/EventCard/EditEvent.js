import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  updateTitle,
  updateHost,
  updateDate,
  updateTime,
  updateDescription,
  updateEventInfo
} from '../../ducks/eventReducer';

class EditEvent extends Component {
  render() {
    //   console.log(this.props)
    return <div>Edit Event</div>;
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    updateTitle,
    updateHost,
    updateDate,
    updateTime,
    updateDescription,
    updateEventInfo
  }
)(EditEvent);
