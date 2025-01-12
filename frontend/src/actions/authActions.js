import { LOGIN_REQUEST, REGISTER_REQUEST } from "../constants/authTypes";

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload: payload,
});

export const registerRequest = (payload) => ({
  type: REGISTER_REQUEST,
  payload: payload,
});
