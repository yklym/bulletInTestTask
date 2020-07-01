const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        default: "-"
    },

    lastName: {
        type: String,
        default: "-"
    },

    posts: {
        type: [mongoose.mongo.ObjectId],
        ref: "Post",
    }
});
