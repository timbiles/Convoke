import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './EventLineView.css';

import { getUser, getEventsAttending } from '../../../ducks/userReducer';

class EventLineView extends Component {
  render() {
    const { eachEvent } = this.props;
    return (
      <div className="elv_container">
        <div className="elv_sub_container">
          <h1 className="elv_date">
            {moment(eachEvent.date).format('dddd, MMM Do, YYYY')}
          </h1>
          <h1 className="elv_title">{eachEvent.title}</h1>
          <div className="elv_sub_content">
            <img className="elv_img" src={eachEvent.img} alt="Event pic" />
            <div className="elv_sub_content1">
              <p>[{eachEvent.host}]</p>
              <p>{moment(eachEvent.time).format('h:mm a')}</p>
              <p>
                {eachEvent.location.substring(0, eachEvent.location.length - 5)}
              </p>
              <br />

                <p className='showing_description'>
                  {eachEvent.description &&
                    (eachEvent.description.length > 55
                      ? eachEvent.description.substring(0, 55) + '...'
                      : eachEvent.description)}
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser, getEventsAttending }
)(EventLineView);
