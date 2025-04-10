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
            min: 1
        }
    },
    discount: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0,
            max: 1
        }
    },
    release_date: {
        type: DataTypes.DATEONLY
    },
    publisher_id: {
        type: DataTypes.UUID,
        references: {
            model: 'Publishers',
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
    reviews: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "Mixed"
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
