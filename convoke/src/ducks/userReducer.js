import axios from 'axios';

const initialState = {
  user: {},
  users: {},
  eventsAttending: [],
  didErr: false,
  auth_id: '',
  name: '',
  email: '',
  home_town: '',
  img: '',
  bio: '',
};

const GET_USER = 'GET_USER';
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_EVENTS_ATTENDING = 'GET_EVENTS_ATTENDING';
const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_HOME_TOWN = 'UPDATE_HOME_TOWN';
const UPDATE_IMG = 'UPDATE_IMG';
const UPDATE_BIO = 'UPDATE_BIO';
const UPDATE_USER = 'UPDATE_USER';
const RESET = 'RESET';

export const getUser = () => {
  return {
    type: GET_USER,
    payload: axios.get('api/me')
  };
};

export const getAllUsers = () => {
  return {
    type: GET_ALL_USERS,
    payload: axios.get('api/users')
  };
};

export const getEventsAttending = users_id => {
  return {
    type: GET_EVENTS_ATTENDING,
    payload: axios.get(`/api/events/${users_id}`)
  };
};

export const updateName = name => {
  return {
    type: UPDATE_NAME,
    payload: name
  };
};

export const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    payload: email
  };
};

export const updateHomeTown = homeTown => {
  return {
    type: UPDATE_HOME_TOWN,
    payload: homeTown
  };
};

export const updateImg = img => {
  return {
    type: UPDATE_IMG,
    payload: img
  };
};

export const updateBio = bio => {
  return {
    type: UPDATE_BIO,
    payload: bio
  };
};

export function reset() {
  return {
    type: RESET,
    payload: ''
  };
}

export const updateUserInfo = (auth_id, name, email, home_town, img, bio) => {
  return {
    type: UPDATE_USER,
    payload: axios.put(`/api/updateUserInfo/${auth_id}`, {
      auth_id,
      name,
      email,
      home_town,
      img,
      bio
    })
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:    
      // let { name, email, home_town, img, bio, auth_id } = action.payload.data;
      return {
        // ...state,
        // user: action.payload.data

        ...state,
        ...action.payload.data
        // name,
        // email,
        // home_town,
        // img,
        // bio,
        // auth_id
      };
    case `${GET_ALL_USERS}_FULFILLED`:
      return {
        ...state,
        users: action.payload.data
      }      
    case `${GET_EVENTS_ATTENDING}_FULFILLED`:
      return {
        ...state,
        eventsAttending: action.payload.data
      };
    case `${GET_USER}_REJECTED`:
    case `${GET_ALL_USERS}_REJECTED`:    
    case `${GET_EVENTS_ATTENDING}_REJECTED`:
      return {
        ...state,
        didErr: true
      };
    case UPDATE_NAME:
      return {
        ...state,
        name: action.payload
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case UPDATE_HOME_TOWN:
      return {
        ...state,
        home_town: action.payload
      };
    case UPDATE_IMG:
      return {
        ...state,
        img: action.payload
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload
      };
    case RESET:
      return {
        name: action.payload,
        email: action.payload,
        home_town: action.payload,
        img: action.payload,
        bio: action.payload
      };
    default:
      return state;
  }
}
