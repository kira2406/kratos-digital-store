import axios from "axios";

export const loginUserApi = async (payload) => {
    try{
        console.log("api", payload)
        const response = await axios.post('http://localhost:3000/api/auth/login',payload)
        return response.data
    } catch(error){
        throw new Error(error.response.data.message || 'An error occurred during login')
    }
}

export const registerUserApi = async (username,email, password) => {
    try{
        const response = await axios.post('http://localhost:3000/api/auth/register',{username,email, password})
        return response.data
    } catch(error){
        throw new Error(error.response.data.message || 'An error occurred during register')
    }
}