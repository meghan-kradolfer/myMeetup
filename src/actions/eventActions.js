import * as types from '../constants/ActionTypes';

export const addNewEvent = (values) => {
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