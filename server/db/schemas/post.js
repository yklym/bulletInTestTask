const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    user : {
        type: mongoose.mongo.ObjectId,
        ref: "User",
    },

    name: {
        type: String,
        default: "Post"
    },
    description: {
        type: String,
        default: "No description"
    },

    addedAt: {
        type: Date,
        default: Date.now
    },
});
