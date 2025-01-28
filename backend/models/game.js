const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_db');

const Game = sequelize.define('Game', {
    game_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal('uuid_generate_v4()')
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    discount: {
        type: DataTypes.FLOAT, // Percentage (e.g., 0.10 for 10%)
        validate: {
            min: 0,
            max: 1
        }
    },
    release_date: {
        type: DataTypes.DATEONLY
    },
    publisher_id: {
        type: DataTypes.STRING,
        references: {
            model: 'Publishers', // Name of the Games table
            key: 'publisher_id'
        },
    },
    rating: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0,
            max: 10
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Games',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Game;
