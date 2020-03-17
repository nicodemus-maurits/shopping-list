import axios from "axios";

import * as actionTypes from "./actionTypes";
import { returnErrors } from "./errorActions";

// Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({ type: actionTypes.USER_LOADING });

  try {
    const response = await axios.get(
      "/api/v1/auth/user",
      tokenConfig(getState)
    );
    dispatch({ type: actionTypes.USER_LOADED, payload: response.data });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: actionTypes.AUTH_ERROR
    });
  }
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
