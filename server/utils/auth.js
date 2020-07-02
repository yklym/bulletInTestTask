const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

module.exports.sha512 = function(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return value;
}

module.exports.generateAccessToken = function(object) {
    return jwt.sign(object, JWT_SECRET, { expiresIn: '6000s' });
}