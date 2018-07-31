import axios from 'axios';

//initial state
const initialState = {
  userEvents: [],
  isLoading: false,
  didErr: false
};

//constants
const GET_USER_EVENTS = 'GET_USER_EVENTS';

//action creators
export function getUserEvents() {
  return {
    type: GET_USER_EVENTS,
    payload: axios.get('/api/user-events')
  };
}

// reducer
export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER_EVENTS}_PENDING`:
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
    case `${GET_USER_EVENTS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        didErr: true
      };
    default:
      return state;
  }
}
