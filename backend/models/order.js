const {DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize_db')

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal('uuid_generate_v4()')
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
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1
        }
    },
    status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "INITIATED"
    },
    payment_method: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "CREDIT_CARD"
    }
},
{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Orders'
});

module.exports = Order