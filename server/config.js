require('dotenv').config({path: __dirname + '/.env'}) // set up env vars

module.exports.port = process.env.PORT || 8080;

module.exports.PASSWORD_HASH_KEY = process.env.PASSWORD_HASH_KEY;

module.exports.JWT_SECRET = process.env.JWT_SECRET;