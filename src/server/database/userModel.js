const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    address: String,
    city: String,
    state: String,
    zip: Number,
    SSN: Number,
    isAdmin: Boolean,
});

const Users = mongoose.model('users', userSchema, 'users');

module.exports = Users;