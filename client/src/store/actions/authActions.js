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

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  try {
    const createdUser = await axios.post("/api/v1/users", body, config);
    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: createdUser.data
    });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, "REGISTER_FAIL")
    );
    dispatch({ type: actionTypes.REGISTER_FAIL });
  }
};

// Login user
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const loggedinUser = await axios.post("/api/v1/auth", body, config);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: loggedinUser.data
    });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
    );
    dispatch({ type: actionTypes.LOGIN_FAIL });
  }
};

// Logout user
export const logout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
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
