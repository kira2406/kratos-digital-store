const {Publisher} = require('../models');
const dotenv = require('dotenv');
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
};

module.exports = publisherService;
