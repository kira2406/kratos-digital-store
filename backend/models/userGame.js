const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_db');

const UserGame = sequelize.define('UserGame', {
    user_game_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    game_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Games',
            key: 'game_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    purchasedAt: { 
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'UserGames',
    timestamps: false
});

module.exports = UserGame;
