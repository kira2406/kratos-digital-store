import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import { persistStore } from "redux-persist";
import persistedReducer from "./persistedRootReducer";

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "persist/PERSIST",
            "persist/REHYDRATE",
          ], // Ignore these actions for serializability check
        },
      }).concat(sagaMiddleware),
  });

// run the root saga
sagaMiddleware.run(rootSaga)

// create persistor for the store
export const persistor = persistStore(store);