const User = require('./user');
const Game = require('./game');
const Wishlist = require('./wishlist');
const Category = require('./category');
const GameCategory = require('./gameCategory');
const Platform = require('./platform');
const GamePlatform = require('./gamePlatform');
const sequelize = require('../config/sequelize_db');
const Publisher = require('./publisher');
const UserGame = require('./userGame');
const CartItem = require('./cartItem');
const Review = require('./review');

// Associations
User.hasMany(Wishlist, { foreignKey: 'user_id' });
Wishlist.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Publisher, { foreignKey: 'user_id' });
Publisher.belongsTo(User, { foreignKey: 'user_id' });

Publisher.hasMany(Game, { foreignKey: 'publisher_id' });
Game.belongsTo(Publisher, { foreignKey: 'publisher_id' });

Game.hasMany(Wishlist, { foreignKey: 'game_id' });
Wishlist.belongsTo(Game, { foreignKey: 'game_id' });

Game.belongsToMany(Category, { through: GameCategory, foreignKey: 'game_id' });
Category.belongsToMany(Game, { through: GameCategory, foreignKey: 'category_id' });

Game.belongsToMany(Platform, { through: GamePlatform, foreignKey: 'game_id' });
Platform.belongsToMany(Game, { through: GamePlatform, foreignKey: 'platform_id' });

User.belongsToMany(Game, { through: UserGame , foreignKey: 'user_id'});
Game.belongsToMany(User, { through: UserGame , foreignKey: 'game_id'});

User.hasMany(CartItem, { foreignKey: "user_id" });
CartItem.belongsTo(User, { foreignKey: "user_id" });

Game.hasMany(CartItem, { foreignKey: "game_id" });
CartItem.belongsTo(Game, { foreignKey: "game_id" });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

Game.hasMany(Review, { foreignKey: 'game_id' });
Review.belongsTo(Game, { foreignKey: 'game_id' });

module.exports = { sequelize, User, Game, Wishlist, Category, GameCategory,Publisher, Platform, GamePlatform };