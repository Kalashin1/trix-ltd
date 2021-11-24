"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var TransactionSchema = new mongoose_1.Schema({
    coin: {
        type: String,
        required: [true, 'Please select the coin you want to buy']
    },
    units: {
        type: Number,
        required: [true, 'Please select the amount of tokens you want to buy.']
    },
    amount: {
        type: Number
    },
    type: {
        type: String,
        required: [true, 'Please select the type of transaction you want to make.']
    },
    status: {
        type: String
    },
    reference: {
        type: String
    },
    transactionId: {
        type: String
    },
    customer: {
        type: String
    },
    customerId: {
        type: String,
        required: [true, 'Please provide the customer this transaction belongs to,']
    },
    date: {
        type: String
    },
    authorizationUrl: {
        type: String
    }
});
exports["default"] = TransactionSchema;
