import axios from 'axios';

const GET_USER = 'GET_USER';

export const getUser = () => {
  return {
    type: GET_USER,
    payload: axios.get('api/me')
  };
};

const initialState = {
  user: {},
  didErr: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        didErr: true
      };
    default:
      return state;
  }
}
