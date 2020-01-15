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
    }
})


let Post = mongoose.model('Post', UserSchema)

module.exports = { Post };