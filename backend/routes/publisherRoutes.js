const express = require('express')
const publisherController = require('../controllers/publisherController')

const router = express.Router()

// Add new publisher
router.post('/addPublisher', publisherController.addPublisher)

// Get publisher details
router.post('/getPublisher', publisherController.getPublisher)

// Get publisher games details
router.post('/getPublishedGames', publisherController.getPublishedGames)

router.post('/getSalesData', publisherController.getForecastSalesData)

module.exports = router