const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize_db');

const ForecastedSales = sequelize.define('ForecastedSales', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    game_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Games', // Assuming you have a 'Games' table
            key: 'game_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    forecast_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    predicted_sales: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
},
{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'ForecastedSales',
});

module.exports = ForecastedSales;
