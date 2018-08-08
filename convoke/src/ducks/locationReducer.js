const initialState = {
    lat: 0,
    lng: 0
  }
  
  const UPDATE_LAT = "UPDATE_LAT";
  const UPDATE_LNG = "UPDATE_LNG";
  
  export const updateLat = lat => {
    return {
      type: UPDATE_LAT,
      payload: lat
    };
  };
  
  export const updateLng = lng => {
    return {
      type: UPDATE_LNG,
      payload: lng
    };
  }
  
  export default function locationReducer(state = initialState, action) {
    switch (action.type) {
      case UPDATE_LAT:
        return {
          ...state,
          lat: action.payload
        };
      case UPDATE_LNG:
        return {
          ...state,
          lng: action.payload
        };
      default:
        return state;
    }
  }