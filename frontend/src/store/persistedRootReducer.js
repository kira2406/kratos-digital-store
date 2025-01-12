import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from '../features/auth/authSlice'
import notificationReducer from '../features/notification/notificationSlice'
import persistReducer from "redux-persist/es/persistReducer";

// create redux-persist configuration
const persistConfig = {
    key: "root", // Key for storing the data
    storage, // Use localStorage as the storage engine
    whitelist: ["auth"], // Specify which reducers to persist (e.g., auth)
  };

const rootReducer = combineReducers({
    auth: authReducer,
    notification: notificationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer