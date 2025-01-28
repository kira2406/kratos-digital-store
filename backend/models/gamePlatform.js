const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_db');

const GamePlatform = sequelize.define('GamePlatform', {
    game_platform_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
    platform_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Platforms',
            key: 'platform_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'GamePlatforms',
    timestamps: false
});

module.exports = GamePlatform;
