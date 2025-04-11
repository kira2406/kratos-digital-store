const gameService = require('../services/gameService')

const gameController = {

    fetchGames: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const genres = req.query.genres || ''
        const categories = req.query.categories || ''

        const genreList = genres ? genres.split(',') : [];
        const categoriesList = categories ? categories.split(',') : [];

        
        const skip = (page - 1) * limit;

        try {
            const {games, total} = await gameService.fetchGames({skip, limit, genreList, categoriesList})
        
            res.status(200).json({
              success: true,
              games,
              total,
              page,
              totalPages: Math.ceil(total / limit),
            });
          } catch (err) {
            console.log(err)
            res.status(500).json({ success:false, message: err});
          }
    },

    // addGame: async (req, res) => {

    //     const {title, description, price, discount=0.0, release_date, rating, publisher_id} = req.body

    //     if (!title || !description || !price || !release_date || !publisher_id){
    //         return res.status(400).json({success:false, message: "Fields are empty"})
    //     }
    //     try{
    //         params = {
    //             title, description, price, discount, release_date, rating, publisher_id
    //         }
    //         const game = await gameService.addGame(params);
    //         return res.status(201).json({success:true, message: 'Game created successfully!', game})

    //     }
    //     catch(error){
    //         return res.status(500).json({success:false, message: error.message})
    //     }


    // },
    // getGameById: async (req, res) => {
    //     const {game_id} = req.body

    //     if (!game_id){
    //         return res.status(400).json({success:false, message: "game_id is empty"})
    //     }

    //     params = {game_id}

    //     try {
    //         const game = await gameService.getGameById(params)
    //         res.status(200).json({
    //             game: game,
    //             success:true,
    //         })
            
    //     } catch (error) {
    //         console.error('Error fetching game details', error)
    //         res.status(401).json({success:false, message: error.message})
    //     }

    // },
    getFeaturedGames: async (req, res) => {
        try{
            const games = await gameService.getFeaturedGames()
            res.status(200).json({
                games: games,
                success:true,
            })
        }
        catch (error) {
            console.error('Error fetching game details', error)
            res.status(401).json({success:false, message: error.message})
        }

    }
}

module.exports = gameController