"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.TransactionQueries = exports.TransactionMutations = void 0;
var transaction_model_1 = require("../../data/models/transaction.model");
var apollo_server_1 = require("apollo-server");
exports.TransactionMutations = {
    createTransaction: function (_, _a) {
        var transaction = _a.transaction;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, transaction_model_1["default"].create(__assign({}, transaction))];
                    case 1: 
                    // console.log(transaction)
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    verifyTransactionWithId: function (_, _a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, transaction_model_1["default"].verifyTransaction(id)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    deleteTransactionWithId: function (_, _a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, transaction_model_1["default"].deleteOne({ _id: id })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, { message: 'successful' }];
                }
            });
        });
    },
    addCustomerWallet: function (_, _a) {
        var id = _a.id, wallet = _a.wallet;
        return __awaiter(this, void 0, void 0, function () {
            var Transaction, message, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, transaction_model_1["default"].findById(id)];
                    case 1:
                        Transaction = _b.sent();
                        return [4 /*yield*/, Transaction.addCustomer(wallet)];
                    case 2:
                        message = _b.sent();
                        return [2 /*return*/, message];
                    case 3:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
exports.TransactionQueries = {
    transactions: function (_, _a) {
        var before = _a.before, after = _a.after, limit = _a.limit;
        return __awaiter(this, void 0, void 0, function () {
            var transactions, currentCursor, Edges, pageInfo, Response_1, currentCursor, Edges, pageInfo, Response_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, transaction_model_1["default"].find({})];
                    case 1:
                        transactions = _b.sent();
                        // console.log(context.req.headers.usertoken);
                        /**
                         * * If before and after is not provided throw an error
                         */
                        if (!before && (!after)) {
                            throw new apollo_server_1.UserInputError('before or after must be provided');
                        }
                        /**
                         * * if no limit is provided use the default limit.
                         */
                        if (!limit) {
                            limit == 5; // * TODO change this limit to 10 later
                        }
                        /**
                         * * if before and after is provided at the same time, throw an error.
                         */
                        if (before && after) {
                            after = transactions[0].date;
                        }
                        /**
                         * * if only before is provided,
                         */
                        if (before && (!after)) {
                            currentCursor = transactions.find(function (transaction) { return transaction.date == before; }).date;
                            Edges = transactions.map(function (transaction) {
                                return {
                                    cursor: transaction.date,
                                    node: { Transaction: transaction }
                                };
                            });
                            console.log(Edges[0].node.Transaction.date);
                            pageInfo = {
                                endCursor: transactions[transactions.indexOf(transactions.find(function (transaction) { return transaction.date == before; })) - limit + 1].date,
                                hasNextPage: function () {
                                    var endCursor = transactions.indexOf(transactions.find(function (transaction) { return transaction.date == before; })) - limit + 1;
                                    // console.log(transactions.slice(0, endCursor).length, limit)
                                    if (transactions.slice(0, endCursor).length >= limit) {
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                } // TODO this should be determined programiatically hasNext page
                            };
                            Response_1 = {
                                count: Edges.length,
                                pageInfo: pageInfo,
                                edges: Edges.slice(
                                // * Get n number of edges after the cursor
                                Edges.indexOf(Edges.find(function (e) { return e.node.Transaction.date == before; })) - limit, 
                                // * Stop at the cursor
                                Edges.indexOf(Edges.find(function (e) { return e.node.Transaction.date == before; })))
                            };
                            return [2 /*return*/, Response_1];
                        }
                        if (!before && (after)) {
                            currentCursor = transactions.find(function (transaction) { return transaction.date == after; }).date;
                            Edges = transactions.map(function (transaction) {
                                return {
                                    cursor: transaction.date,
                                    node: { Transaction: transaction }
                                };
                            });
                            pageInfo = {
                                endCursor: transactions[transactions.indexOf(transactions.find(function (transaction) { return transaction.date == after; }))].date,
                                hasNextPage: function () {
                                    var endCursor = transactions.indexOf(transactions.find(function (transaction) { return transaction.date == after; })) + limit;
                                    console.log(transactions.slice(endCursor, transactions.length).length, limit);
                                    if (transactions.slice(endCursor, transactions.length).length >= limit) {
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                } // TODO this should be determined programiatically
                            };
                            Response_2 = {
                                count: Edges.length,
                                pageInfo: pageInfo,
                                edges: Edges.slice(
                                // * Stop at the cursor
                                Edges.indexOf(Edges.find(function (e) { return e.node.Transaction.date == after; })), 
                                // * Get n number of edges before the cursor
                                Edges.indexOf(Edges.find(function (e) { return e.node.Transaction.date == after; })) + limit)
                            };
                            return [2 /*return*/, Response_2];
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    transaction: function (_, _a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, transaction_model_1["default"].findById(id)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }
};
