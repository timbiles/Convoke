import axios from 'axios';

//initial state
const initialState = {
  events: [],
  events_id: '',
  title: '',
  host: '',
  date: '',
  time: '',
  description: '',
  isLoading: false,
  didErr: false
};

//constants
const GET_EVENTS = 'GET_EVENTS';
const GET_EVENT = 'GET_EVENT';
const REMOVE_EVENT = 'REMOVE_EVENT';
const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_HOST = 'UPDATE_HOST';
const UPDATE_DATE = 'UPDATE_DATE';
const UPDATE_TIME = 'UPDATE_TIME';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_EVENT = 'UPDATE_EVENT';

//action creators
export function getEvents() {
  return {
    type: GET_EVENTS,
    payload: axios.get('/api/events')
  };
}

export function getEvent(events_id) {
  return {
    type: GET_EVENT,
    payload: axios.get(`/api/events/${events_id}`)
  };
}

export const removeEvent = event => {
  return {
    type: REMOVE_EVENT,
    payload: axios.delete(`/api/events/${event}`)
  };
};

export const updateTitle = title => {
  console.log('hit title');

  return {
    type: UPDATE_TITLE,
    payload: title
  };
};

export const updateHost = host => {
  console.log('hit host');
  console.log(initialState);
  return {
    type: UPDATE_HOST,
    payload: host
  };
};

export const updateDate = date => {
  console.log('hit date');

  return {
    type: UPDATE_DATE,
    payload: date
  };
};

export const updateTime = time => {
  console.log('hit time');

  return {
    type: UPDATE_TIME,
    payload: time
  };
};

export const updateDescription = description => {
  console.log('hit description');

  return {
    type: UPDATE_DESCRIPTION,
    payload: description
  };
};

export const updateEventInfo = (
  events_id,
  title,
  host,
  date,
  time,
  description
) => {
  console.log('hit update all');

  return {
    type: UPDATE_EVENT,
    payload: axios.put(`/api/updateEventInfo/${events_id}`, {
      events_id,
      title,
      host,
      date,
      time,
      description
    })
  };
};

// reducer
export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_EVENTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EVENTS}_FULFILLED`:
    case `${REMOVE_EVENT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        events: action.payload.data
      };
    case `${GET_EVENTS}_REJECTED`:
    case `${REMOVE_EVENT}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        didErr: true
      };
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.payload
      };
      console.log(this.state.title);
    case UPDATE_HOST:
      return {
        ...state,
        host: action.payload
      };
    case UPDATE_DATE:
      return {
        ...state,
        date: action.payload
      };
    case UPDATE_TIME:
      return {
        ...state,
        time: action.payload
      };
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.payload
      };
    default:
      return state;
  }
}
