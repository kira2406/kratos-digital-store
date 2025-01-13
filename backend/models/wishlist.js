const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_db');

const Wishlist = sequelize.define('Wishlist', {
    wishlist_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
            model: 'Games', // Name of the Games table
            key: 'game_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'Wishlists',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Wishlist;
