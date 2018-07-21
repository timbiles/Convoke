import axios from 'axios';

//initial state
const initialState = {
  events: [],
  isLoading: false,
  didErr: false
};

//constants
const GET_EVENTS = 'GET_EVENTS';
// const CREATE_EVENT = 'CREATE_EVENT';
// const REMOVE_EVENT = 'REMOVE_EVENT';

//action creators
export function getEvents() {
  return {
    type: GET_EVENTS,
    payload: axios.get('/api/events')
  };
};

// export const createEvent = event => {
//   return {
//     type: CREATE_EVENT,
//     payload: axios.post(`/api/events`)
//   };
// };

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
        }
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
      }
    default:
      return state;
  }
}
