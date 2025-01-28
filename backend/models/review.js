const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_db');

const Review = sequelize.define('Review', {
    review_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal('uuid_generate_v4()')
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users', // Name of the Users table
            key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    game_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Games', // Name of the Users table
            key: 'game_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT
    },
    will_recommend: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'Reviews',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'game_id']  // Enforce uniqueness on the combination of user_id and game_id
        }
    ]
});

module.exports = Review;
