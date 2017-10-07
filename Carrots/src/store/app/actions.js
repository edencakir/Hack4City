import * as types from '../types';

export const getDestination = destination => dispatch => {
  dispatch({
    type: types.GET_LOCATION,
    destination
  });
};
