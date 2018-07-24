// import axios from 'axios';

//initial state
const initialState = {
  title: '',
  host: '',
  date: '',
  time: '',
  location: '',
  img: ''
};

//constants
const UPDATE_EVENT_NAME = 'UPDATE_EVENT_NAME';
const UPDATE_HOST = 'UPDATE_HOST';
const UPDATE_DATE = 'UPDATE_DATE';
const UPDATE_TIME = 'UPDATE_TIME';
const UPDATE_LOCATION = 'UPDATE_LOCATION';
const UPDATE_IMG = 'UPDATE_IMG';
const RESET = 'RESET';

//action creators
export const updateEventName = title => {
  return {
    type: UPDATE_EVENT_NAME,
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

export const updateLocation = location => {
  return {
    type: UPDATE_LOCATION,
    payload: location
  };
};

export const updateImg = img => {
  return {
    type: UPDATE_IMG,
    payload: img
  };
};

export function reset() {
  return {
    type: RESET,
    payload: ''
  };
}

// reducer
export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EVENT_NAME:
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
    case UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case UPDATE_IMG:
      return {
        ...state,
        img: action.payload
      }
    case RESET:
      return {
        title: action.payload,
        host: action.payload,
        date: action.payload,
        time: action.payload,  
        location: action.payload,
        img: action.payload              
      };
    default:
      return state;
  }
}

// export const createEvent = event => {
//   return {
//     type: CREATE_EVENTS,
// };
//     payload: axios.post(`/api/events`)
//   };
