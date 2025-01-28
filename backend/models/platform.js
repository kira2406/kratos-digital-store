const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_db');


const Platform = sequelize.define('Platform', {
    platform_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'Platforms',
    timestamps: false
});

module.exports = Platform;
