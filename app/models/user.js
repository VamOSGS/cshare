const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methds.setPassword = password => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1')
}

userSchema.methds.validPassword = password => {
    const hash = crypto.pbkdf2(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
}

module.exports = mongoose.model('User', userSchema);