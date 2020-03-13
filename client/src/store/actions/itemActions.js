import * as actionTypes from "./actionTypes";

export const getItems = () => {
  return {
    type: actionTypes.GET_ITEMS
  };
};

export const deleteItem = id => {
  return {
    type: actionTypes.DELETE_ITEM,
    payload: id
  };
};

export const addItem = newItem => {
  return {
    type: actionTypes.ADD_ITEM,
    payload: newItem
  };
};
