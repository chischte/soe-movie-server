const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
});


/**
 * link to the DB directory
 */
module.exports = mongoose.model('user', userSchema, 'users');
