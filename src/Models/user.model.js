const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: [true, 'Email is required. Please Enter your email!'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Username is required. Please Enter your username!']
    },
    password: {
        type: String,
        required: [true, 'Password is required. Please Enter your password!']
    },
    number: {
        type: Number,
        unique: true
    },
    is_active: {
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;