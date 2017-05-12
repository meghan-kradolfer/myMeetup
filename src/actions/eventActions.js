import * as types from '../constants/ActionTypes';

export const addNewEvent = (values) => {
  return {
    type: types.ADD_EVENT,
    values
  }
};

export const addNewGuest = (values, eventId) => {
  return {
    type: types.ADD_GUEST,
    values,
    eventId
  }
};

export const editEvent = (values) => {
  return {
    type: types.EDIT_EVENT,
    values
  }
};

export const editGuest = (values) => {
  return {
    type: types.EDIT_GUEST,
    values
  }
};

export const removeEvent = (values) => {
  return {
    type: types.REMOVE_EVENT,
    values
  }
};

export const removeGuest = (values) => {
  return {
    type: types.REMOVE_GUEST,
    values
  }
};