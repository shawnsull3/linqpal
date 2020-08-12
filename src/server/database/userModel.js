const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    SSN: String,
    isAdmin: Boolean,
});

const Users = mongoose.model('users', userSchema, 'users');

module.exports = Users;