import { call, put, takeLatest } from "redux-saga/effects";
import {topFiveGameFailure, topFiveGameSuccess } from "../features/games/gameSlice";
import { getTopFiveGamesApi } from "../api/games";
import { TOP_FIVE_GAME_REQUEST } from "../constants/gameTypes";

function* getTopFiveGamesSaga(){
    try{
        const data = yield call(getTopFiveGamesApi)

        if (!data?.success){
            throw new Error("Something went wrong")
        }

        yield put(topFiveGameSuccess(data))

    } catch(error){
        yield put(topFiveGameFailure(error?.message || 'Failed to retrieve game data'))
    }
}

function* gameDataSaga(){
    yield takeLatest(TOP_FIVE_GAME_REQUEST, getTopFiveGamesSaga)
}

export default gameDataSaga;