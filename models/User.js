const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    company_name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    usertype: { type: String, required: true }
});

const User = mongoose.model('user', UserSchema);

module.exports =User;