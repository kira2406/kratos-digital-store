import { TOP_FIVE_GAME_REQUEST } from "../constants/gameTypes";

export const getTopFiveGameRequest = (payload) => ({
  type: TOP_FIVE_GAME_REQUEST,
  payload: payload,
});
