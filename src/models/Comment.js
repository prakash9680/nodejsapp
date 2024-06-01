const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    blogPostId: {
        type: String,
        required: true,
    },
    authorId : {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    }
});

const User = mongoose.model("comment", userSchema);

module.exports = User;