import { call, put, takeLatest } from "redux-saga/effects";
import {loginFailure, loginRequest, loginSuccess, logoutRequest, registerRequest, registerFailure, registerSuccess, logoutSuccess, logoutFailure } from "../reducers/auth/authSlice";
import { registerUserApi } from "../api/auth";
import { addNotification } from "../reducers/notification/notificationSlice";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

const API_URL = import.meta.env.VITE_KRATOS_BACKEND_URL;

function* loginSaga(action){
    try{
        const {email, password} = action.payload;

        const payload = {
            email: email,
            password: password
        }

        const response = yield call(axios.post,`${API_URL}/api/auth/login`, payload)

        if (!response?.data?.success){
            throw new Error("Something went wrong")
        }
        
        const modData = {
            user: response?.data?.user,
            token: response?.data?.token
        }

        yield put(loginSuccess(modData))

        yield put(addNotification({ id: Date.now(), message: "Login successful!", type: "success" }));

    } catch(error){
        yield put(loginFailure(error?.message || 'Login Failed'))
    }
}

function* registerSaga(action){
    try{
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
            user: data?.user,
            token: data?.token,
        }


        yield put(registerSuccess(modData))
        

    } catch(error){
        yield put(registerFailure(error?.message || 'Registration Failed'))
    }
}

function* logoutSaga(){
    try{
        
        const response = yield call(axiosInstance.post, '/api/auth/logout')

        if (!response?.data?.success){
            throw new Error("Something went wrong")
        }

        yield put(logoutSuccess())
        

    } catch(error){
        yield put(logoutFailure(error?.message || 'Logout Failed'))
    }
}

function* authSaga(){
    yield takeLatest(loginRequest.type, loginSaga),
    yield takeLatest(registerRequest.type, registerSaga)
    yield takeLatest(logoutRequest.type, logoutSaga)
}

export default authSaga;