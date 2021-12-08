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
exports.UserMutations = exports.UserQueries = exports.User = void 0;
var user_model_1 = require("../../data/models/user.model");
var transaction_model_1 = require("../../data/models/transaction.model");
var exchange_model_1 = require("../../data/models/exchange.model");
var apollo_server_1 = require("apollo-server");
exports.User = {
    transactions: function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, transaction_model_1["default"].find({ customerId: parent._id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    exchanges: function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, exchange_model_1["default"].find({ customer: parent._id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
};
exports.UserQueries = {
    users: function (_, _a) {
        var before = _a.before, after = _a.after, limit = _a.limit;
        return __awaiter(this, void 0, void 0, function () {
            var Users, currentCursor, Edges, pageInfo, Response_1, currentCursor, Edges, pageInfo, Response_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
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
                            throw new apollo_server_1.UserInputError('before and after should not be provided together, please prvide only one.');
                        }
                        return [4 /*yield*/, user_model_1["default"].find({})];
                    case 1:
                        Users = _b.sent();
                        /**
                         * * if only before is provided,
                         */
                        if (before && (!after)) {
                            currentCursor = Users.find(function (user) { return user.createdAt == before; }).createdAt;
                            Edges = Users.map(function (user) {
                                return {
                                    cursor: user.createdAt,
                                    node: { User: user }
                                };
                            });
                            console.log(Edges[0].node.User.createdAt);
                            pageInfo = {
                                endCursor: Users[Users.indexOf(Users.find(function (user) { return user.createdAt == before; })) - limit + 1].createdAt,
                                hasNextPage: function () {
                                    var endCursor = Users.indexOf(Users.find(function (user) { return user.createdAt == before; })) - limit + 1;
                                    console.log(Users.slice(0, endCursor).length, limit);
                                    if (Users.slice(0, endCursor).length >= limit) {
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
                                Edges.indexOf(Edges.find(function (e) { return e.node.User.createdAt == before; })) - limit, 
                                // * Stop at the cursor
                                Edges.indexOf(Edges.find(function (e) { return e.node.User.createdAt == before; })))
                            };
                            return [2 /*return*/, Response_1];
                        }
                        if (!before && (after)) {
                            currentCursor = Users.find(function (user) { return user.createdAt == after; }).createdAt;
                            Edges = Users.map(function (user) {
                                return {
                                    cursor: user.createdAt,
                                    node: { User: user }
                                };
                            });
                            pageInfo = {
                                endCursor: Users[Users.indexOf(Users.find(function (user) { return user.createdAt == after; }))].createdAt,
                                hasNextPage: function () {
                                    var endCursor = Users.indexOf(Users.find(function (user) { return user.createdAt == after; })) + limit;
                                    console.log(Users.slice(endCursor, Users.length).length, limit);
                                    if (Users.slice(endCursor, Users.length).length >= limit) {
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
                                Edges.indexOf(Edges.find(function (e) { return e.node.User.createdAt == after; })), 
                                // * Get n number of edges before the cursor
                                Edges.indexOf(Edges.find(function (e) { return e.node.User.createdAt == after; })) + limit)
                            };
                            return [2 /*return*/, Response_2];
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    user: function (_, _a, context) {
        var id = _a.id;
        return user_model_1["default"].findById(id);
    }
};
exports.UserMutations = {
    createAccount: function (_, _a, context) {
        var profile = _a.profile;
        return __awaiter(this, void 0, void 0, function () {
            var _b, User_1, token, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1["default"].createAccount(profile)];
                    case 1:
                        _b = _c.sent(), User_1 = _b[0], token = _b[1];
                        User_1.token = token;
                        return [2 /*return*/, User_1];
                    case 2:
                        e_1 = _c.sent();
                        return [2 /*return*/, new apollo_server_1.UserInputError(e_1.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    login: function (_, _a, context) {
        var loginInfo = _a.loginInfo;
        return __awaiter(this, void 0, void 0, function () {
            var _b, user, token, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1["default"].login(loginInfo)];
                    case 1:
                        _b = _c.sent(), user = _b[0], token = _b[1];
                        user.token = token;
                        return [2 /*return*/, user];
                    case 2:
                        e_2 = _c.sent();
                        return [2 /*return*/, new apollo_server_1.UserInputError(e_2.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    updatePhoneNumber: function (_, _a, context) {
        var phoneNumber = _a.phoneNumber, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var user, res, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, user_model_1["default"].findById(id)];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, user.updatePhoneNumber(phoneNumber)];
                    case 2:
                        res = _b.sent();
                        return [2 /*return*/, { message: res }];
                    case 3:
                        e_3 = _b.sent();
                        console.log(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    sendEmailVerificationMessage: function (parent, _a) {
        var email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1["default"].sendVerificationEmail(email)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, { message: 'Verification code sent!, check your email' }];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, new apollo_server_1.UserInputError(error_1.messsage)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    verifyEmail: function (_, _a) {
        var email = _a.email, code = _a.code;
        return __awaiter(this, void 0, void 0, function () {
            var User_2, emailVerified, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, user_model_1["default"].findOne({ email: email })];
                    case 1:
                        User_2 = _b.sent();
                        return [4 /*yield*/, User_2.verifyEmail(code)];
                    case 2:
                        emailVerified = _b.sent();
                        if (emailVerified) {
                            return [2 /*return*/, { message: "email Verified" }];
                        }
                        else {
                            return [2 /*return*/, { message: "email is not verified" }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        return [2 /*return*/, new apollo_server_1.UserInputError(error_2.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
