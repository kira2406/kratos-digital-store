const express = require('express')
const gameController = require('../controllers/gameController')

const router = express.Router()

// add new game
router.post('/addGame', gameController.addGame)

// get game details by Id
router.post('/getGameById', gameController.getGameById)

// get top five games
router.get('/getTopFiveGames', gameController.getTopFiveGames)

module.exports = router