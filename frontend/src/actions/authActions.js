import { LOGIN_REQUEST, REGISTER_REQUEST } from "../constants/authTypes";

export const loginRequest = ({username, email, password}) => ({
  type: LOGIN_REQUEST,
  payload: { username, email, password },
});

export const registerRequest = ({username, email, password}) => ({
  type: REGISTER_REQUEST,
  payload: { username, email, password },
});
