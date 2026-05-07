const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,  
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailVerifyToken: {
        type: String,
        default: undefined,
    },
    emailVerifyTokenExpires: {
        type: Date,
        default: undefined,
    },
    tokenVersion: {
        type: Number,
        default: 0,
    },
    resetPasswordToken: {
        type: String,
        default: undefined,
    },
    resetPasswordExpires: {
        type: Date,
        default: undefined,
    },
    nemesis: {
        type: String,
        default: "DP",
    },
    profile: {
        type: String,
        default: './logo.png',
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);