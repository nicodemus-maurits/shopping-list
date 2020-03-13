import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [
    { id: 0, name: "Vegetables" },
    { id: 1, name: "Eggs" },
    { id: 2, name: "Milk" },
    { id: 3, name: "Steak" },
    { id: 4, name: "Water" }
  ]
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEMS:
      return { ...state };
    default:
      return state;
  }
};

export default itemReducer;
