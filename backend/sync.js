const sequelize = require('./config/sequelize_db');

(async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Database synchronized (force: true)');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    // Close the Sequelize connection after sync
    await sequelize.close();
  }
})();
