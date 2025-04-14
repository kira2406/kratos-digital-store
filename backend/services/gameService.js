// const {Game} = require('../models');
const Game = require('../models/gameModel')
const dotenv = require('dotenv');
dotenv.config()

const gameService = {
    // Register new user
    // addGame: async (params) => {
    //     // {title, description, price, discount, release_data, rating, publisher_id}
    //     const {title} = params
    //     try {
    //         // Check if user already exists
    //         const existingGame = await Game.findOne({where: {title}});
    //         if (existingGame) {
    //             throw new Error('Game name is already in use');
    //         }
            
    //         // Save new publisher to database
    //         const newGame = await Game.create(params);

    //         return newGame
    //     } catch (error) {
    //         throw error       
    //     }
    // },

    // Login user
    // getGameById: async ({game_id}) => {
    //     try {
    //         // Check if game_id is provided
    //         if (!game_id) {
    //             throw new Error('game_id is required');
    //         }
    //         let game = await Game.findOne({ where: { game_id } });
            
    //         if (!game){
    //             throw new Error('Game not found');
    //         }

    //         return game;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    getFeaturedGames: async () => {
        try{
            const games = await Game.find({ featured: true })
            .limit(5).sort({average_playtime_forever: -1})
            return games
        }
        catch (error) {
            throw error;
        }
    },
    fetchGames: async ({skip, limit, genreList, categoriesList, game_id}) => {
        try{
            const filter = {};

            if (game_id) {
                const game = await Game.findById(game_id);
                if (!game) return { games: [], total: 0 };
                return { games: [game], total: 1 };
            }

            if (genreList.length > 0) {
                filter.genres = { $in: genreList };
            }

            if (categoriesList.length > 0) {
                filter.categories = { $in: categoriesList };
            }

            const games = await Game.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ average_playtime_forever: -1, release_date: -1 });// optional: newest first
            
            const total = await Game.countDocuments(filter);

            return {games, total}
        }catch(error){
            console.timeLog("error", error)
            throw error
        }        
    }
};

module.exports = gameService;
