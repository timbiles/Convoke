import React, { Component } from 'react';
// import DatePicker from 'react-custom-date-picker';
import $ from 'jquery';
import 'fullcalendar';

import './Calendar.css';

class Calendar extends React.Component {
  componentDidMount() {
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultView: 'month',
      contentHeight: 600,
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

  
  render() {
    return <div id="calendar">

    </div>;
  }
}

export default Calendar;
