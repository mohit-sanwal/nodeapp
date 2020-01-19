const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    userId: {
        type: String,
        required: true
    },
    likeCount: {
        type: Number,
        default: 0
    },
    dislikeCount: {
        type : Number,
        default: 0
    },
    isLiked : {
        type: Boolean,
        default: false
    },
    isDisliked : {
        type: Boolean,
        default: false
    },
    postImage: {type: String}
})


let Post = mongoose.model('Post', UserSchema)

module.exports = { Post };