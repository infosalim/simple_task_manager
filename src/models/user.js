const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can\'t contain "password"');
            }
        }
    },
    age: {
        type: Number,
        default: 1,
        validate(value) {
            if (value < 1) {
                throw new Error('Age must be a positive number and greater than 0');
            }
        }
    }
});

module.exports = User;
