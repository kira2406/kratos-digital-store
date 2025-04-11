import { call, put, takeLatest } from "redux-saga/effects";
import {featuredGamesFailure, featuredGamesRequest, featuredGamesSuccess, gamesLibraryFailure, gamesLibraryRequest, gamesLibrarySuccess } from "../reducers/games/gameSlice";
import axios from "axios";

const API_URL = import.meta.env.VITE_KRATOS_BACKEND_URL;

function* getFeaturedGamesSaga(){
    try{

        const response = yield call(axios.get,`${API_URL}/api/game/getFeaturedGames`)

        if (!response?.data?.success){
            throw new Error("Something went wrong")
        }

        yield put(featuredGamesSuccess(response?.data))

    } catch(error){
        yield put(featuredGamesFailure(error?.message || 'Failed to retrieve game data'))
    }
}

function* getGamesLibrarySaga(action){
    try{
        const {page, genreList, categoriesList} = action.payload
        const response = yield call(axios.get,`${API_URL}/api/game?page=${page}&limit=20&genres=${genreList}&categories=${categoriesList}`)

        if (!response?.data?.success){
            throw new Error("Something went wrong")
        }

        yield put(gamesLibrarySuccess(response?.data))

    } catch(error){
        yield put(gamesLibraryFailure(error?.message || 'Failed to retrieve game data'))
    }
}

function* gameDataSaga(){
    yield takeLatest(featuredGamesRequest.type, getFeaturedGamesSaga)
    yield takeLatest(gamesLibraryRequest.type, getGamesLibrarySaga)
}

export default gameDataSaga;