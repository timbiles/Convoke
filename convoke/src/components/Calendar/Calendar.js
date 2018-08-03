import React, { Component } from 'react';
// import DatePicker from 'react-custom-date-picker';
import 'fullcalendar';
import $ from 'jquery';
// import moment from 'moment';

import './Calendar.css';


class Calendar extends Component {
  render() {
    return <div id="calendar" />;
  }
  componentDidMount() {
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
      }
    });
  }
}

export default Calendar;
