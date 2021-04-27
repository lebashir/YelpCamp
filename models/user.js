const mongoose = require('mongoose');
const passportLocalMopngoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMopngoose);

module.exports = mongoose.model('User', UserSchema);
