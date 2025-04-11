const fs = require('fs');
const mongoose = require('mongoose');
const Game = require('./models/gameModel'); // adjust the path
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  const games = await Game.find({}).lean(); // lean() returns plain JS objects

  fs.writeFileSync('games_dump.json', JSON.stringify(games, null, 2));
  console.log(`✅ Exported ${games.length} games to games_dump.json`);

  await mongoose.disconnect();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
