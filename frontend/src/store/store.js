import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from '../features/auth/authSlice'
import notificationReducer from '../features/notification/notificationSlice'
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        auth: authReducer,
        notification: notificationReducer
    },
    middleware: (getDefaultMiddleware) => {return getDefaultMiddleware().concat(sagaMiddleware)}
})

sagaMiddleware.run(rootSaga)

export default store