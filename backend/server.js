const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routes = require('./routes'); // Consolidated routes
const sequelize = require('./config/sequelize_db');

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// API Routes
app.use('/api', routes);

// Default Route
app.use('/', (req, res) => {
    res.status(200).json({ message: 'Kratos backend initialized' });
});

// 404 Route Not Found
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Sync database and start server
sequelize
    .sync({force: false, alter: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });
