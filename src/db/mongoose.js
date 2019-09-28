const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

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

// const salim = new User({
//     name: 'Sagor Ahmed',
//     age: 16,
//     email: 'sagorAhmeD@gmail.com',
//     password: 'milasSalim'
// });

// salim.save().then(() => {
//     console.log(salim);
// }).catch(error => {
//     console.log(error.message);
// });

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const cooking = new Task({
    description: 'Beefff!!',
    completed: true,
});

cooking.save().then(()=>{
    console.log(cooking);
}).catch(error=>{
    console.log(error.message);
});