const express = require('express')
const gameController = require('../controllers/gameController')

const router = express.Router()

// User registration route
router.post('/addGame', gameController.addGame)

// User login route
router.post('/getGameById', gameController.getGameById)

module.exports = router