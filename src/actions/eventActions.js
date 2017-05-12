import * as types from '../constants/ActionTypes';

export const addNewEvent = (values) => {
  console.log(values);
    return {
        type: types.ADD_EVENT,
        values
    }
};

export const addNewGuest = (values, id) => {
    return {
        type: types.ADD_GUEST,
        values,
        id
    }
};

export const editEvent = (values) => {
  return {
    type: types.EDIT_EVENT,
    values
  }
};

export const editGuest = (values, id) => {
  return {
    type: types.EDIT_GUEST,
    values,
    id
  }
};