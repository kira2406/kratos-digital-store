import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from '../features/auth/authSlice'
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => {return getDefaultMiddleware().concat(sagaMiddleware)}
})

sagaMiddleware.run(rootSaga)

export default store