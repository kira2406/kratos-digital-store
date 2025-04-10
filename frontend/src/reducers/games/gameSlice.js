import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topFiveGames: [],
    loading: false,
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
        }
    }
})

export const {
    topFiveGameRequest,
    topFiveGameSuccess,
    topFiveGameFailure
} = gameSlice.actions

export default gameSlice.reducer