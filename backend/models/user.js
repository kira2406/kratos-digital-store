const {DataTypes} = require('sequelize')
const sequelize = require('../config/sequelize_db')

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true // Ensure username is not an empty string
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true // Validates that the value is a proper email format
        }
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true // Ensure password_hash is not an empty string
        }
    },
    profile_picture_url: {
        type: DataTypes.TEXT
    },
    isPublisher: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
},
{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Users'
});

module.exports = User