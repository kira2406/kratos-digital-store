import axios from "axios";

export const loginUserApi = async (payload) => {
    try{
        const response = await axios.post('http://localhost:3000/api/auth/login',payload)
        console.log("response", response)

        return response.data
    } catch(error){
        throw new Error(error.response.data.message || 'An error occurred during login')
    }
}

export const registerUserApi = async (payload) => {
    try{
        const response = await axios.post('http://localhost:3000/api/auth/register',payload)
        return response.data
    } catch(error){
        throw new Error(error.response.data.message || 'An error occurred during register')
    }
}