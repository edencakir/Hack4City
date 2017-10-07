import * as types from '../types';

const initialState = {};

export default (appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LOCATION:
      return {
        ...state,
        destination: action.destination
      };
    default:
      return state;
  }
});
