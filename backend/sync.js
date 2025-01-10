const sequelize = require('./config/sequelize_db'); // Your Sequelize instance

(async () => {
  try {
    await sequelize.sync({ force: true }); // Drops and recreates tables
    console.log('Database synchronized (force: true)');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    await sequelize.close();
  }
})();