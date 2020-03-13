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

    case actionTypes.ADD_ITEM:
      return {
        ...state,
        items: state.items.concat(action.payload)
      };

    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};

export default itemReducer;
