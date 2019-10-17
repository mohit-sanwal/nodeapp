let mongoose = require("mongoose");

let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})


// user = new user({
//     email: 'mohitsanwal19@gmail.com'
// })

// user.save().then((doc) => {
//     console.log('User saved', doc);
// }, (e) => {
//     console.log('unable to save user', e);
// });

module.exports = { User };