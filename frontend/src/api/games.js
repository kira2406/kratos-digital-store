import axios from "axios";

export const getTopFiveGamesApi = async (payload) => {
    try{
        const response = await axios.get('http://localhost:3000/api/game/getTopFiveGames',payload)

        return response.data
    } catch(error){
        throw new Error(error.response.data.message || 'An error occurred during login')
    }
}