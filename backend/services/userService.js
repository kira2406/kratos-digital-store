const User = require("../models/userModel"); 

const createUser = async (userId, email, username) => {
  try {

    const newUser = new User({
      userId: userId,
      email: email,
      displayName: username
    });

    await newUser.save();
  } catch (error) {
    throw new Error("Error saving user to the database: " + error.message);
  }
};

const getUserById = async (userId) => { 
  try {
    const user = await User.findOne({ userId });
    return user;
  } catch (error) {
    throw new Error("Error retrieving user: " + error.message);
  }
};

module.exports = { createUser, getUserById };
