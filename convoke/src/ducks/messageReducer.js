const initialState = {
    messages: []
}

const GET_MESSAGES = 'GET_MESSAGES';
const UPDATE_MESSAGES = 'UPDATE_MESSAGES';

  export const getMessages = messages => {
    return {
      type: GET_MESSAGES,
      payload: messages
    };
  };

  export const updateMessages = newMessage => {
    return {
      type: UPDATE_MESSAGES,
      payload: newMessage
    };
  };

  export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
        return {
            ...state,

        }
        case UPDATE_MESSAGES: 
        return {
            ...state,
            messages: state.arr.concat(action.newMessage)
        }
        default:
        return state;
    }

  }