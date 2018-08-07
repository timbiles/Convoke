import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'fullcalendar';
import $ from 'jquery';
import moment from 'moment';

import './fullcalendar.css';
import './Calendar.css';

import { getUser, getEventsAttending } from '../../ducks/userReducer';

class Calendar extends Component {
  componentDidMount() {
    this.props.getEventsAttending(this.props.user.users_id);

    console.log(this.props)

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      drop: function() {
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
          // if so, remove the element from the "Draggable Events" list
          $(this).remove();
        }
      },
      events: `/api/events/${this.props.user.users_id}`,
      eventMouseover: function(e, jsEvent) {
        const tooltip =
          '<div class="tooltipevent" style="padding:1% 1.5%;opacity: 0.8;background:rgb(241, 241, 241);position:absolute;z-index:10001;">' +
          e.title +
          '<br />' +
          moment(e.time).format('h:mm a')
          +
          '<br />' +
          e.location.substring(0, e.location.length - 5) +
          '</div>';
        $('body').append(tooltip);
        $(this)
          .mouseover(function(e) {
            $(this).css('z-index', 10000);
            $('.tooltipevent').fadeIn('500');
            $('.tooltipevent').fadeTo('10', 1.9);
          })
          .mousemove(function(e) {
            $('.tooltipevent').css('top', e.pageY + 10);
            $('.tooltipevent').css('left', e.pageX + 20);
          });
      },
      eventMouseout: function(calEvent, jsEvent) {
        $(this).css('z-index', 8);
        $('.tooltipevent').remove();
      },
      eventClick: function(e) {
        window.location.href = `/events/${e.title}`;
      }
    });
  }

  render() {
    return (
      <div className="calendar_container">
        <div id="calendar" />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  {
    getUser,
    getEventsAttending
  }
)(Calendar);
