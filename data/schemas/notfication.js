"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var NotificationSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: [true, 'Please provide the id of the owner']
    },
    body: {
        type: String,
        required: [true, 'please provide the body of the notification']
    },
    isRead: {
        type: Boolean,
        "default": function () { return false; }
    },
    type: {
        type: String,
        required: [true, 'please provide the type of the notification']
    },
    date: {
        type: String,
        "default": function () { return new Date().toString(); }
    }
});
exports["default"] = NotificationSchema;
