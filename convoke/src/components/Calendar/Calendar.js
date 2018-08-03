import React, { Component } from 'react';
// import DatePicker from 'react-custom-date-picker';
import 'fullcalendar';
import $ from 'jquery';
// import moment from 'moment';

import './fullcalendar.css';
import './Calendar.css';

class Calendar extends Component {
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

  //   $('.external_events .fc-event').each(function() {

	// 		// store data so the calendar knows to render an event upon drop
	// 		$(this).data('event', {
	// 			title: $.trim($(this).text()), // use the element's text as the event title
	// 			stick: true // maintain when user navigates (see docs on the renderEvent method)
	// 		});

	// 		// make the event draggable using jQuery UI
	// 		$(this).draggable({
	// 			zIndex: 999,
	// 			revert: true,      // will cause the event to go back to its
	// 			revertDuration: 0  //  original position after the drag
	// 		});
	// 	});
  }


  render() {
    return (
      <div className='calendar_container'>
        <div className="external_events">
          <h4>Draggable Events</h4>
          <div className="fc-event">My Event 1</div>
          <div className="fc-event">My Event 2</div>
          <div className="fc-event">My Event 3</div>
          <div className="fc-event">My Event 4</div>
          <div className="fc-event">My Event 5</div>
          <p>
            <input type="checkbox" id="drop-remove" />
            <label for="drop-remove">remove after drop</label>
          </p>
        </div>
        <div id="calendar" />
      </div>
    );
  }
}

export default Calendar;
