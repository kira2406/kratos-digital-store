import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import { persistStore } from "redux-persist";
import rootReducer from "../reducers";

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
  });

// run the root saga
sagaMiddleware.run(rootSaga)

// create persistor for the store
export const persistor = persistStore(store);