const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: String
    },
    tags: {
        type: Array,
        required: true,
    },
    image: {
        type: String,
        required: true,
        get: getBlogImageUrl,
    }
}, { toJSON: { getters: true, setters: true} });

function getBlogImageUrl(value) {
    return process.env.BLOG_IMAGE_URL + value;
}
const User = mongoose.model("blog", userSchema);

module.exports = User;