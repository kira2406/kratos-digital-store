import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import gameDataSaga from "./gameSaga";

function* rootSaga() {
    yield all([
        authSaga(),
        gameDataSaga()
    ])
}

export default rootSaga;