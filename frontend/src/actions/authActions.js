import { LOGIN_REQUEST, REGISTER_REQUEST } from "../constants/authTypes";

export const loginRequest = ({username, email, password}) => ({
  type: LOGIN_REQUEST,
  payload: { username, email, password },
});

// Add more actions as needed
export const registerRequest = (username, email, password) => ({
  type: REGISTER_REQUEST,
  payload: { username, email, password },
});
