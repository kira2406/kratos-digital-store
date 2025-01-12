import { call, put, takeLatest } from "redux-saga/effects";
import {loginFailure, loginSuccess } from "../features/auth/authSlice";
import { loginUserApi } from "../api/auth";
import { LOGIN_REQUEST } from "../constants/authTypes";

function* loginSaga(action){
    try{
        console.log(action)
        const {username, email, password} = action.payload;

        const payload = {
            username: username,
            email: email,
            password: password
        }

        const data = yield call(loginUserApi, payload)

        yield put(loginSuccess(loginSuccess(data)))

        console.log("Token", data?.token)
        localStorage.setItem('jwtToken', data?.token)

    } catch(error){
        yield put(loginFailure(error?.message || 'Login Failed'))
    }
}

// function* registerSaga(action){
//     try{{
//         const response = yield call(axios.post, 'http://localhost:3000/api/auth/register', action.payload)
//         const {user} = response.data
        
//     }}
// }

function* authSaga(){
    yield takeLatest(LOGIN_REQUEST, loginSaga)
}

export default authSaga;