const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_db');

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal('uuid_generate_v4()')
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Categories',
    timestamps: false
});

module.exports = Category;
