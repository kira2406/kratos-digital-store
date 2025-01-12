import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true
            state.error = ""
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.error= ""
            state.user = action.payload.user
            state.token = action.payload.token
        },
        loginFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        logOut: (state) => {
            state.user = null
            state.token = null
        },
        registerRequest: (state) => {
            state.loading = true
            state.error = ""
        },
        registerSuccess: (state, action) => {
            state.loading = false
            state.error = ""
            state.user = action.payload.user
            state.token = action.payload.token
        },
        registerFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
    }
})

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logOut,
    registerRequest,
    registerSuccess,
    registerFailure
} = authSlice.actions

export default authSlice.reducer