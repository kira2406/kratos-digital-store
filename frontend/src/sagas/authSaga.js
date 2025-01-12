import { call, put, takeLatest } from "redux-saga/effects";
import {loginFailure, loginSuccess, registerFailure, registerSuccess } from "../features/auth/authSlice";
import { loginUserApi, registerUserApi } from "../api/auth";
import { LOGIN_REQUEST, REGISTER_REQUEST } from "../constants/authTypes";
import { addNotification } from "../features/notification/notificationSlice";

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

        if (!data?.success){
            throw new Error("Something went wrong")
        }
        
        const modData = {
            user: data.user_id,
            token: data.token
        }

        yield put(loginSuccess(modData))

        yield put(addNotification({ id: Date.now(), message: "Login successful!", type: "success" }));

        localStorage.setItem('jwtToken', data?.token)
        // navigate('/')

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

        if (!data?.success){
            throw new Error("Something went wrong")
        }
        
        const modData = {
            user: data?.user?.user_id,
            token: data?.user?.token,
        }


        yield put(registerSuccess(modData))
        

    } catch(error){
        yield put(registerFailure(error?.message || 'Registration Failed'))
    }
}

function* authSaga(){
    yield takeLatest(LOGIN_REQUEST, loginSaga),
    yield takeLatest(REGISTER_REQUEST, registerSaga)
}

export default authSaga;