import * as types from '../types';

export const getDestination = destination => dispatch =>
  dispatch({
    type: types.GET_DESTINATION,
    destination
  });

export const setTransportation = transport => dispatch =>
  dispatch({
    type: types.SET_TRANSPORTATION,
    transport
  });
