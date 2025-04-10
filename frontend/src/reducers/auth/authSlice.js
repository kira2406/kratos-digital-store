import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null,
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
            localStorage.setItem("jwtToken", action.payload.token);
        },
        loginFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        logoutRequest: (state) => {
            state.loading = true
        },
        logoutSuccess: (state) => {
            state.loading = false
            state.user = null
        },
        logoutFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        registerRequest: (state) => {
            state.loading = true
            state.error = ""
        },
        registerSuccess: (state, action) => {
            state.loading = false
            state.error = ""
            state.user = action.payload.user
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
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    registerRequest,
    registerSuccess,
    registerFailure
} = authSlice.actions

export default authSlice.reducer