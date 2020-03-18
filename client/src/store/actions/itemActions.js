import axios from "axios";

import * as actionTypes from "./actionTypes";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => async dispatch => {
  dispatch(setItemsLoading());
  try {
    const fetchedItems = await axios.get("/api/v1/items");

    dispatch({
      type: actionTypes.GET_ITEMS,
      payload: fetchedItems.data.data
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const addItem = item => async (dispatch, getState) => {
  try {
    const addedItem = await axios.post(
      "api/v1/items",
      item,
      tokenConfig(getState)
    );
    dispatch({
      type: actionTypes.ADD_ITEM,
      payload: addedItem.data.data
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const deleteItem = id => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/v1/items/${id}`, tokenConfig(getState));
    dispatch({
      type: actionTypes.DELETE_ITEM,
      payload: id
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const setItemsLoading = () => {
  return {
    type: actionTypes.ITEMS_LOADING
  };
};
