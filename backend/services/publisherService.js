const { where } = require('sequelize');
const {Publisher, Game, ForecastedSales, OrderItem, Order} = require('../models');
const dotenv = require('dotenv');
const { Op } = require('sequelize');
const sequelize = require('../config/sequelize_db');
dotenv.config()

const publisherService = {
    // Register new user
    addPublisher: async ({user_id, publisher_name, description}) => {
        try {
            // Check if user already exists
            const existingPub = await Publisher.findOne({where: {publisher_name}});
            if (existingPub) {
                throw new Error('Publisher name already in use');
            }
            
            // Save new publisher to database
            const newPublisher = await Publisher.create({
                user_id,
                publisher_name,
                description
            });

            return newPublisher
        } catch (error) {
            throw error       
        }
    },

    // Login user
    getPublisher: async ({publisher_id}) => {
        try {
            // Check if email or username is provided
            if (!publisher_id) {
                throw new Error('publisher_id is required');
            }
            let publisher = await Publisher.findOne({ where: { publisher_id } });
            
            if (!publisher){
                throw new Error('Publisher not found');
            }

            return publisher;
        } catch (error) {
            throw error;
        }
    },

    getPublishedGames: async ({publisher_id}) => {

        try{

            let games = await Game.findAll({
                where: {
                    publisher_id: publisher_id
                }
                }
            )
            return games || []
        }
        catch(error){
            throw error;
        }

    },
    getForecastSalesData: async ({game_id}) => {
        try {
            let salesData = await ForecastedSales.findAll({
                where: { game_id },
                attributes: ['forecast_date', 'predicted_sales'],
                order: [['forecast_date', 'ASC']], // Sort by date
            });

            const formattedSalesData = salesData.map(item => {
                const date = new Date(item.forecast_date);
                const formattedDate = date.getFullYear() + '-' 
                                    + String(date.getMonth() + 1).padStart(2, '0') + '-'
                                    + String(date.getDate()).padStart(2, '0'); // Ensure 2-digit month and day
                return {
                    forecast_date: formattedDate,
                    predicted_sales: item.predicted_sales
                };
            });

            return formattedSalesData;
        } catch (error) {
            throw error;
        }
    },
    getActualSales: async ({game_id}) => {
        try{
        let salesData = await OrderItem.findAll({
            where: { game_id },
            attributes: [
                [sequelize.fn('DATE', sequelize.col('Order.created_at')), 'sale_date'],
                [sequelize.fn('SUM', sequelize.col('quantity')), 'total_sold'],
            ],
            include: [
                {
                    model: Order,
                    attributes: [],
                }
            ],
            group: [sequelize.fn('DATE', sequelize.col('Order.created_at'))],
            order: [[sequelize.fn('DATE', sequelize.col('Order.created_at')), 'ASC']]
        });
        return salesData
        }
        catch(error){
            throw error
        }
    }
};

module.exports = publisherService;
