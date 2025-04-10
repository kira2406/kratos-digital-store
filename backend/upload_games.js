const mongoose = require('mongoose');
require("dotenv").config();
const JSONStream = require('JSONStream');

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err);
  });



const fs = require('fs');
const path = require('path');
const Game = require('./models/gameModel');

const gamesData = [];

async function uploadGamesFromFile(filePath) {
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
  const gamesData = JSON.parse(fileContent); // Assuming the file is a valid JSON array of game objects

  let count = 0; // To track the number of games inserted
  for (const gameData of gamesData) {
      const newGame = new Game(gameData);

      try {
          await newGame.save(); // Save each game to the database
          count++;
          console.log(`Game ${gameData._id} uploaded successfully`);

          if (count >= 1000) {
              console.log('Uploaded 1000 games. Closing the connection.');
              mongoose.connection.close(); // Close the connection after uploading
              break; // Stop after uploading 1000 games
          }
      } catch (err) {
          console.error(`Error uploading game ${gameData._id}:`, err);
      }
  }

  if (count < 1000) {
      mongoose.connection.close(); // Close the connection if less than 1000 games were uploaded
  }
}

// Main function to start the process
async function main() {
  const mongoURI = process.env.MONGODB_URI; // Replace with your MongoDB URI
  try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB');

      const filePath = './output2.json'; // Specify the path to your JSON file
      await uploadGamesFromFile(filePath); // Upload games data
  } catch (err) {
      console.log('Error connecting to MongoDB', err);
  }
}

main();