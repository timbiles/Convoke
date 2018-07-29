import axios from 'axios';

//initial state
const initialState = {
  events: [],
  isLoading: false,
  didErr: false
};

//constants
const GET_EVENTS = 'GET_EVENTS';
const REMOVE_EVENT = 'REMOVE_EVENT';

//action creators
export function getEvents() {
  return {
    type: GET_EVENTS,
    payload: axios.get('/api/events')
  };
}

export const removeEvent = event => {
  return {
    type: REMOVE_EVENT,
    payload: axios.delete(`/api/events/${event}`)
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
    default:
      return state;
  }
}
