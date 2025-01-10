const { Sequelize } = require('sequelize');
require('dotenv').config();

// Set up Sequelize connection using environment variables
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    port: process.env.DB_PORT,
    logging: false, // Set to true to log SQL queries (optional)
});

module.exports = sequelize;