import * as types from '../types';

const initialState = {};

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
