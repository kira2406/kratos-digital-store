const {DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize_db')

const OrderItem = sequelize.define('OrderItem', {
    order_item_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal('uuid_generate_v4()')
    },
    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Orders',
            key: 'order_id'
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    unit_price:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1
        }
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1
        }
    }
},
{
    timestamps: false,
    tableName: 'OrderItems'
});

module.exports = OrderItem