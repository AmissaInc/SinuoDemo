import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    USER_LOADED,
    REGISTER_FAIL,
    LOGIN_FAIL
  } from '../actions/authRegister';
  
  const initialState = {
    token: localStorage.getItem('token'), //CDD
    isAuthenticated: null, //CDD
    user: null, //CDD
    error: null //CDD
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return { ...state, ...action.payload, isAuthenticated: true, loading: false };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload
        };
      case REGISTER_FAIL:
      case LOGIN_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload
        };
      default:
        return state;
    }
  }
  