const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    vorname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    personen: {
        type: Number,
        required: true
    },
    zeit: {
        type: String,
        required: true
    } 
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;