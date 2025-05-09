import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topFiveGames: [],
    games: {},
    pageMap: {},
    loading: false,
    featuredGameLoaded: false,
    featuredGameLoading: false,
    featuredGameError: false,
    gameLibraryLoaded: false,
    totalPages: 0,
    error: ""
}

const gameSlice = createSlice({
    name: 'games',
    initialState,
    reducers:{
        topFiveGameRequest: (state) => {
            state.loading = true
            state.error = ""
        },
        topFiveGameSuccess: (state, action) => {
            state.loading = false
            state.error= ""
            state.topFiveGames = action.payload.games
        },
        topFiveGameFailure: (state, action ) => {
            state.loading = false
            state.error= action.payload.error.message
        },
        featuredGamesRequest: (state) => {
            state.featuredGameLoading = true
            state.featuredGameError = ""
        },
        featuredGamesSuccess: (state, action) => {
            state.featuredGameLoading = false
            state.featuredGameError = ""
            state.featuredGameLoaded = true
            const gamesArray = action.payload.games
            
            gamesArray.forEach(game => {
                state.games[game._id] = game;
            });
        },
        featuredGamesFailure: (state, action) => {
            state.featuredGameLoading = false
            state.featuredGameError = action.payload
        },
        gamesLibraryRequest: (state) => {
            state.loading = true
            state.error = ""
        },
        gamesLibrarySuccess: (state, action) => {
            state.loading = false
            state.error = ""
            const gamesArray = action.payload.data.games
            const pagesArray = []
            
            gamesArray.forEach(game => {
                if (!state.games[game._id]) {
                    state.games[game._id] = game;
                }
                pagesArray.push(game._id);
            });
            state.pageMap[action.payload.data.page] = pagesArray
            state.totalPages = action.payload.data.totalPages
            state.gameLibraryLoaded = action.payload.paginated
        },
        gamesLibraryFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    topFiveGameRequest,
    topFiveGameSuccess,
    topFiveGameFailure,
    featuredGamesRequest,
    featuredGamesSuccess,
    featuredGamesFailure,
    gamesLibraryRequest,
    gamesLibrarySuccess,
    gamesLibraryFailure
} = gameSlice.actions

export default gameSlice.reducer