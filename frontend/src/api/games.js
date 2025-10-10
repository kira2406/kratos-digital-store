import axios from "axios";
const API_URL = import.meta.env.VITE_KRATOS_BACKEND_URL;

export const getTopFiveGamesApi = async (payload) => {
    try{
        const response = await axios.get(`${API_URL}/api/game/getTopFiveGames`,payload)

        return response.data
    } catch(error){
        throw new Error(error.response.data.message || 'An error occurred during login')
    }
}