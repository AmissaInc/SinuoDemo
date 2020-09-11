export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const USER_LOADED = 'USER_LOADED';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function authRegisterSuccess(token) {
  return {
    type: REGISTER_SUCCESS,
    payload:token
  };
}

export function authLoginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    payload:token
  };
}

export function authentication(token) {
  return {
    type: USER_LOADED,
    payload:token
  };
}

export function authRegisterFail(err) {
  return {
    type: REGISTER_FAIL,
    payload:err
  };
}

export function authLoginFail(err) {
  return {
    type: LOGIN_FAIL,
    payload:err
  };
}

