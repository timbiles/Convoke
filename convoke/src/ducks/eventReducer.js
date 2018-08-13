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
  location: '',
  isLoading: false,
  didErr: false
};

//constants
const GET_EVENTS = 'GET_EVENTS';
const UPDATE_TITLE = 'UPDATE_TITLE';
const UPDATE_HOST = 'UPDATE_HOST';
const UPDATE_DATE = 'UPDATE_DATE';
const UPDATE_TIME = 'UPDATE_TIME';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_LOCATION = 'UPDATE_LOCATION';
const UPDATE_EVENT = 'UPDATE_EVENT';

//action creators
export function getEvents() {
  return {
    type: GET_EVENTS,
    payload: axios.get('/api/events')
  };
}

export const updateTitle = title => {
  return {
    type: UPDATE_TITLE,
    payload: title
  };
};

export const updateHost = host => {
  return {
    type: UPDATE_HOST,
    payload: host
  };
};

export const updateDate = date => {
  return {
    type: UPDATE_DATE,
    payload: date
  };
};

export const updateTime = time => {
  return {
    type: UPDATE_TIME,
    payload: time
  };
};

export const updateDescription = description => {
  return {
    type: UPDATE_DESCRIPTION,
    payload: description
  };
};

export const updateLocation = location => {
  return {
    type: UPDATE_LOCATION,
    payload: location
  };
};

export const updateEventInfo = (
  events_id,
  title,
  host,
  date,
  time,
  description,
  location
) => {

  return {
    type: UPDATE_EVENT,
    payload: axios.put(`/api/updateEventInfo/${events_id}`, {
      title,
      host,
      date,
      time,
      description,
      location
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
      return {
        ...state,
        isLoading: false,
        events: action.payload.data
      };
    case `${GET_EVENTS}_REJECTED`:
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
      case UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    default:
      return state;
  }
}
