import axios from 'axios';

//initial state
const initialState = {
  events: [],
  searchEvents: '',
  isLoading: false,
  didErr: false
};

//constants
const GET_EVENTS = 'GET_EVENTS';
const SEARCH_EVENTS = 'SEARCH_EVENTS';
// const REMOVE_EVENT = 'REMOVE_EVENT';

//action creators
export function getEvents() {
  return {
    type: GET_EVENTS,
    payload: axios.get('/api/events')
  };
}

export function searchEvents(text) {
  return {
    type: SEARCH_EVENTS,
    payload: text
  };
}

// export const removeEvent = event => {
//   return {
//     type: REMOVE_EVENT,
//     payload: axios.delete(`/api/events/${events_id}`)
//   };
// };

// reducer
export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_EVENTS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EVENTS}_FULFILLED`:
      // case `${CREATE_EVENT}_FULFILLED`:
      // case `${REMOVE_EVENT}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        events: action.payload.data
      };
    case `${GET_EVENTS}_REJECTED`:
      // case `${CREATE_EVENT}_REJECTED`:
      // case `${REMOVE_EVENT}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        didErr: true
      };
    case SEARCH_EVENTS:
    return {
      ...state,
      searchText: action.payload
    }
    default:
      return state;
  }
}
