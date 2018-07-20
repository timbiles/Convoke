import axios from 'axios';

//initial state
const initialState = {
  events: []
};

//constants
const GET_EVENT = 'GET_EVENT';
const CREATE_EVENT = 'CREATE_EVENT';
const REMOVE_EVENT = 'REMOVE_EVENT';

//action creators
export const getEvent = () => {
  return {};
};

export const createEvent = () => {
  return {};
};

export const removeEvent = () => {
  return {};
};

//reducer
export default function eventReducer(state = initialState, action) {
  switch (action.type) {
      case 
    default:
      return state;
  }
}
