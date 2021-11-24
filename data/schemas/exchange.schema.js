"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ExchangeSchema = new mongoose_1.Schema({
    exchangedCoin: {
        type: String,
        required: [true, 'Please enter the coin you want to exchange.']
    },
    exchangeUnits: {
        type: Number,
        required: [true, 'Please enter the units of the token you want to exchange.']
    },
    acceptedCoin: {
        type: String,
        required: [true, 'Please provice the wallet you want to recieve the swapped coins']
    },
    acceptedUnits: {
        type: Number,
        required: [true, 'Please enter the units of the token you want to exchange.']
    },
    acceptedCoinWallet: {
        type: String,
        required: [true, 'Please provice the wallet you want to recieve the swapped coins']
    },
    date: {
        type: String,
        "default": function () { return String(new Date().getTime()); }
    },
    status: {
        type: String,
        "default": function () { return 'inProgress'; }
    },
    customer: {
        type: String,
        required: [true, 'Please provice the customer that wants to make this transaction.']
    }
});
exports["default"] = ExchangeSchema;
