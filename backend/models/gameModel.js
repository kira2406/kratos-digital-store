const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  _id: String,
  name: String,
  featured: { type: Boolean, default: false },
  release_date: Date,
  required_age: Number,
  price: Number,
  dlc_count: Number,
  detailed_description: String,
  about_the_game: String,
  short_description: String,
  reviews: String,
  header_image: String,
  website: String,
  support_url: String,
  support_email: String,
  windows: Boolean,
  mac: Boolean,
  linux: Boolean,
  metacritic_score: Number,
  metacritic_url: String,
  achievements: Number,
  recommendations: Number,
  notes: String,
  supported_languages: [String],
  full_audio_languages: [String],
  packages: [
      {
          title: String,
          description: String,
          subs: [
              {
                  text: String,
                  description: String,
                  price: Number
              }
          ]
      }
  ],
  developers: [String],
  publishers: [String],
  categories: [String],
  genres: [String],
  screenshots: [String],
  movies: [String],
  user_score: Number,
  score_rank: String,
  positive: Number,
  negative: Number,
  estimated_owners: String,
  average_playtime_forever: Number,
  average_playtime_2weeks: Number,
  median_playtime_forever: Number,
  median_playtime_2weeks: Number,
  peak_ccu: Number,
  tags: Object
});
  
  const Game = mongoose.model('Game', gameSchema, "games");

  module.exports = Game;