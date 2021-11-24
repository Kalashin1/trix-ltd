"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var transaction_schema_1 = require("../schemas/transaction.schema");
var crypto = require("crypto");
var notification_1 = require("./notification");
var user_model_1 = require("./user.model");
var payment_helper_1 = require("../../utils/payment-helper");
var mongoose_1 = require("mongoose");
transaction_schema_1["default"].pre('save', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _a, customer, _b, reference, authUrl, err;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    this.date = String(new Date().getTime());
                    // console.log(this.date, new Date().getTime())
                    _a = this;
                    return [4 /*yield*/, crypto.createHash('sha256').update(this.date).digest('hex')];
                case 1:
                    // console.log(this.date, new Date().getTime())
                    _a.transactionId = _c.sent();
                    if (!(this.type == 'buy')) return [3 /*break*/, 4];
                    return [4 /*yield*/, user_model_1["default"].findById(this.customerId)];
                case 2:
                    customer = _c.sent();
                    if (!customer) {
                        throw Error('No customer with that id');
                    }
                    return [4 /*yield*/, (0, payment_helper_1.initializeTransaction)(customer.email, this.amount)];
                case 3:
                    _b = _c.sent(), reference = _b[0], authUrl = _b[1], err = _b[2];
                    if (err) {
                        throw Error(err);
                    }
                    this.reference = reference;
                    this.authorizationUrl = authUrl;
                    _c.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
transaction_schema_1["default"].statics.verifyTransaction = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var Transaction, _a, status, err;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, this.findById(id)];
                case 1:
                    Transaction = _b.sent();
                    if (!Transaction) {
                        throw Error('No transation with that Id');
                    }
                    return [4 /*yield*/, (0, payment_helper_1.verifyTransaction)(Transaction.reference)];
                case 2:
                    _a = _b.sent(), status = _a[0], err = _a[1];
                    if (err) {
                        throw Error("Opps something happened: " + err);
                    }
                    return [4 /*yield*/, Transaction.updateOne({ status: status })];
                case 3:
                    _b.sent();
                    return [2 /*return*/, { message: status }];
            }
        });
    });
};
transaction_schema_1["default"].methods.addCustomer = function (customer) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!this.customer) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.updateOne({ customer: customer })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, notification_1["default"].create({
                            userId: this.customerId,
                            body: "New wallet " + this.customer + " provided for transaction with reference " + this.transactionId,
                            type: "Transaction Notification, Wallet Provided"
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, { message: 'Wallet provided successfully' }];
                case 3: throw new Error('Wallet already provided!');
            }
        });
    });
};
transaction_schema_1["default"].post('save', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, notification_1["default"].create({
                        userId: this.customerId,
                        body: "New transaction to " + this.type + " " + this.units + " " + this.coin + " at " + new Date(this.date).toString() + " with wallet " + this.customer,
                        type: "Payment."
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
var Transactions = (0, mongoose_1.model)('transaction', transaction_schema_1["default"]);
exports["default"] = Transactions;
