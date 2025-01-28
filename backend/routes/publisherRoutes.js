const express = require('express')
const publisherController = require('../controllers/publisherController')

const router = express.Router()

// User registration route
router.post('/addPublisher', publisherController.addPublisher)

// User login route
router.post('/getPublisher', publisherController.getPublisher)

module.exports = router