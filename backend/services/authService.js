const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config()

const authService = {
    // Register new user
    registerUser: async (username, email, password) => {
        try {
            // Check if user already exists
            const existingUser = await User.findOne({where: {email}});
            if (existingUser) {
                throw new Error('Email already in use');
            }
            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save new user to database
            const newUser = await User.create({
                username,
                email,
                password_hash: hashedPassword,
            });

            return {
                user_id: newUser.user_id,
                username: newUser.username,
                email: newUser.email
            };
        } catch (error) {
            throw error       
        }
    },

    // Login user
    loginUser: async ({email, username, password}) => {
        try {
            // Check if email or username is provided
            if (!email && !username) {
                throw new Error('Email or Username is required');
            }
            let user;
            // Try to find user by email
            if (email) {
                user = await User.findOne({ where: { email } });
            }
            // Try to find user by username
            if (!user && username) {
                user = await User.findOne({ where: { username } });
            }
            // If no user is found, return error
            if (!user){
                throw new Error('Invalid credentials');
            }
            // Compare password with hashed password
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            // Generate JWT token
            const token = jwt.sign({
                user_id: user.user_id,
                username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            return token;
        } catch (error) {
            throw error;
        }
    },

    // Validate JWT Token
    validateToken: (token) => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
};

module.exports = authService;
