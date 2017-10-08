import * as types from '../types';

const initialState = {
  destination: {
    latitude: 38.457952,
    longitude: 27.0890082,
    latitudeDelta: 0.1022,
    longitudeDelta: 0.0421
  }
};

export default (appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DESTINATION:
      return {
        ...state,
        destination: action.destination
      };
    case types.SET_TRANSPORTATION:
      return {
        ...state,
        transport: action.transport
      };

    default:
      return state;
  }
});
