const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/linqpal', { useNewUrlParser: true, useUnifiedTopology: true });
const User = require('./userModel');

const db = mongoose.connection;

const getUserData = async (username) => {
  return await User.find({ username: username });
}

const getAllUserData = () => {
    return User.find();
}

const createNewUser = async (userData) => {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
}

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

module.exports = {
  getUserData,
  getAllUserData,
  createNewUser,
}