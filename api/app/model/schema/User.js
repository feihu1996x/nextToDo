const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: String,
    email: {
        type: String,
        unique: true,
    },
}, { timestamps: {}, versionKey: false });

const User = mongoose.model('User', UserSchema, 'users');
