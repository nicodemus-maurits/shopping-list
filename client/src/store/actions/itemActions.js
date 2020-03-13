import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getItems = () => async dispatch => {
  dispatch(setItemsLoading());
  try {
    const fetchedItems = await axios.get("/api/v1/items");

    dispatch({
      type: actionTypes.GET_ITEMS,
      payload: fetchedItems.data.data
    });
  } catch (error) {}
};

export const addItem = item => async dispatch => {
  try {
    const addedItem = await axios.post("api/v1/items", item);
    dispatch({
      type: actionTypes.ADD_ITEM,
      payload: addedItem.data.data
    });
  } catch (error) {}
};

export const deleteItem = id => async dispatch => {
  try {
    await axios.delete(`/api/v1/items/${id}`);
    dispatch({
      type: actionTypes.DELETE_ITEM,
      payload: id
    });
  } catch (error) {}
};

export const setItemsLoading = () => {
  return {
    type: actionTypes.ITEMS_LOADING
  };
};
