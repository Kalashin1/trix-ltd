"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var validators_1 = require("../../utils/validators");
var UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name.']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
        validate: validators_1.isEmail,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide your password.'],
        validate: validators_1.isPassword
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide your number.']
    },
    emailVerified: {
        type: Boolean,
        "default": false
    },
    emailVerificationCode: {
        type: Number
    },
    dob: {
        type: String
    },
    displayImage: {
        type: String
    },
    socialMediaInfo: {
        twitter: { type: String },
        facebook: { type: String },
        instagram: { type: String }
    },
    gender: {
        type: String,
        required: [true, 'Please provide your gender']
    },
    createdAt: {
        type: String,
        "default": function () { return new Date().toString(); }
    },
    articles: {
        type: [String]
    },
    savedArticles: {
        type: [String]
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    }
});
exports["default"] = UserSchema;
