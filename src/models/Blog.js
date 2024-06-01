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
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    image: {
        type: String,
        get: getBlogImageUrl,
    }
}, { toJSON: { getters: true, setters: true} });

function getBlogImageUrl(value) {
    if (value) {
        return process.env.BLOG_IMAGE_URL + value;
    }
    return '';
}
const User = mongoose.model("blog", userSchema);

module.exports = User;