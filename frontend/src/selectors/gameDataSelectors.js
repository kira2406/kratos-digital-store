import { createSelector } from "reselect";

export const selectTopFiveGamesData = (state) => state.gamesData.topFiveGames || [];

const selectGamesState = (state) => state.gamesData;
const selectPage = (_, page) => page;

export const selectGamesByPage = createSelector(
  [selectGamesState, selectPage],
  (gamesState, page) => {
    const gameIds = gamesState.pageMap?.[page] || [];
    return gameIds.map(id => gamesState.games[id]).filter(Boolean);
  }
);

export const selectGameById = createSelector(
  [selectGamesState, (_, gameId) => gameId], // Get gameId dynamically from the props
  (gamesState, gameId) => {
    return gamesState.games[gameId] || null;  // Return game if found, else null
  }
);