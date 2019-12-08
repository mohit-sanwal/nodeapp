const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require("lodash");
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// this method is used to send the selected property we want to send back.
UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    return _.pick(userObject, ['email', '_id']); 
}

UserSchema.methods.generateAuthToken = function() {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
}

UserSchema.pre('save', function(next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                console.log(hash);
                user.password = hash;
                next()
            });
        })
    } else {
        next();
    }
})

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;
    try {
       decoded =  jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
       '_id': decoded._id,
       'tokens.token': token,
       'tokens.access': 'auth'
    });
}

let User = mongoose.model('User', UserSchema)

module.exports = { User };


