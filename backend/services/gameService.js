const {Game} = require('../models');
const dotenv = require('dotenv');
dotenv.config()

const gameService = {
    // Register new user
    addGame: async (params) => {
        // {title, description, price, discount, release_data, rating, publisher_id}
        const {title} = params
        try {
            // Check if user already exists
            const existingGame = await Game.findOne({where: {title}});
            if (existingGame) {
                throw new Error('Game name is already in use');
            }
            
            // Save new publisher to database
            const newGame = await Game.create(params);

            return newGame
        } catch (error) {
            throw error       
        }
    },

    // Login user
    getGameById: async ({game_id}) => {
        try {
            // Check if game_id is provided
            if (!game_id) {
                throw new Error('game_id is required');
            }
            let game = await Game.findOne({ where: { game_id } });
            
            if (!game){
                throw new Error('Game not found');
            }

            return game;
        } catch (error) {
            throw error;
        }
    },
    getGames: async () => {
        try{
            const games = await Game.findAll({
                limit: 5,
                order: [['release_date', 'DESC']]
            })
            return games

        }
        catch (error) {
            throw error;
        }
    }
};

module.exports = gameService;
