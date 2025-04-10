import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice'
import notificationReducer from './notification/notificationSlice'
import gamesDataReducer from './games/gameSlice'


const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer,
    gamesData: gamesDataReducer
})

export default rootReducer