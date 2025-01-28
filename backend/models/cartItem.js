const {DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize_db')

const CartItem = sequelize.define('CartItem', {
    cartitem_id: {
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    added_at: {
        type: DataTypes.DATE,
        defaultValue:
        DataTypes.NOW
    },
},
{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'CartItems'
});

module.exports = CartItem