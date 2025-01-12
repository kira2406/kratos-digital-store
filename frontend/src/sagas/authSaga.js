import { call, put, takeLatest } from "redux-saga/effects";
import {loginFailure, loginSuccess, registerFailure, registerSuccess } from "../features/auth/authSlice";
import { loginUserApi, registerUserApi } from "../api/auth";
import { LOGIN_REQUEST, REGISTER_REQUEST } from "../constants/authTypes";

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

        yield put(loginSuccess(data))

        localStorage.setItem('jwtToken', data?.token)

    } catch(error){
        yield put(loginFailure(error?.message || 'Login Failed'))
    }
}

function* registerSaga(action){
    try{
        console.log(action)
        const {username, email, password} = action.payload;

        const payload = {
            username: username,
            email: email,
            password: password
        }

        const data = yield call(registerUserApi, payload)

        yield put(registerSuccess(data))
        

    } catch(error){
        yield put(registerFailure(error?.message || 'Registration Failed'))
    }
}

function* authSaga(){
    yield takeLatest(LOGIN_REQUEST, loginSaga),
    yield takeLatest(REGISTER_REQUEST, registerSaga)
}

export default authSaga;