const express = require('express');
const authRoutes = require('./authRoutes');
const publisherRoutes = require('./publisherRoutes')
const gameRoutes = require('./gameRoutes')

const router = express.Router();

// define individual routes
router.use('/auth', authRoutes);
router.use('/publisher', publisherRoutes);
router.use('/game', gameRoutes);

module.exports = router;
