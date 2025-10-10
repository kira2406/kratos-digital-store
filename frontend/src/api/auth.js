import axios from "axios";
const API_URL = import.meta.env.VITE_KRATOS_BACKEND_URL;


export const loginUserApi = async (payload) => {
    try{
        const response = await axios.post(`${API_URL}/api/auth/login`,payload)

        return response.data
    } catch(error){
        throw new Error(error.response.data.message || 'An error occurred during login')
    }
}

export const registerUserApi = async (payload) => {
    try{
        const response = await axios.post(`${API_URL}/api/auth/register`,payload)
        return response.data
    } catch(error){
        throw new Error(error.response.data.message || 'An error occurred during register')
    }
}