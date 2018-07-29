import axios from 'axios';

//initial state
const initialState = {
  userEvents: [],
  eventCount: [],
  isLoading: false,
  didErr: false
};

//constants
const GET_USER_EVENTS = 'GET_USER_EVENTS';
const GET_EVENT_COUNT = 'GET_EVENT_COUNT';

//action creators
export function getUserEvents() {
  return {
    type: GET_USER_EVENTS,
    payload: axios.get('/api/user-events')
  };
}

export const eventCount = events_id => {
  return {
    type: GET_EVENT_COUNT,
    payload: axios.get(`/api/event-count/${events_id}`)
  };
};

// reducer
export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER_EVENTS}_PENDING`:
    case `${GET_EVENT_COUNT}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_USER_EVENTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        userEvents: action.payload.data
      };
    case `${GET_EVENT_COUNT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        eventCount: action.payload.data
      };

    case `${GET_USER_EVENTS}_REJECTED`:
    case `${GET_EVENT_COUNT}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        didErr: true
      };
    default:
      return state;
  }
}
