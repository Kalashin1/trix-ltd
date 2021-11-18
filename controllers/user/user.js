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
var user_controller_1 = require("./user.controller");
var user_model_1 = require("../../data/models/user.model");
var article_model_1 = require("../../data/models/article.model");
var notification_1 = require("../../data/models/notification");
exports.User = {
    articles: function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, article_model_1["default"].getUserArticles(parent._id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    savedArticles: function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            var articles;
            var _this = this;
            return __generator(this, function (_a) {
                articles = parent.savedArticles.map(function (article) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, article_model_1["default"].findById(article)];
                    });
                }); });
                return [2 /*return*/, articles];
            });
        });
    },
    followers: function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, parent.followers.map(function (f) { return user_model_1["default"].findById(f); })];
            });
        });
    },
    following: function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, parent.following.map(function (f) { return user_model_1["default"].findById(f); })];
            });
        });
    },
    notifications: function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, notification_1["default"].findUserNotifications(parent._id)];
            });
        });
    }
};
exports.UserQueries = {
    users: function (_, _a, context) {
        var after = _a.after, limit = _a.limit;
        return __awaiter(this, void 0, void 0, function () {
            var Users, Edges, pageInfo, Response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, user_controller_1.getUsers)()];
                    case 1:
                        Users = _b.sent();
                        if (!after) {
                            after = Users[0]._id.toString();
                        }
                        Edges = Users.map(function (user) {
                            console.log(user);
                            return ({
                                cursor: user._id.toString(),
                                node: { User: user }
                            });
                        });
                        pageInfo = {
                            endCursor: Users[Edges.indexOf(Edges.find(function (e) { return e.node.User._id.toString() == after; })) + limit - 1]._id.toString(),
                            hasNextPage: false
                        };
                        Response = {
                            pageInfo: pageInfo,
                            count: Edges.length,
                            edges: Edges.slice(Edges.indexOf(Edges.find(function (e) { return e.node.User._id.toString() == after; })), Edges.indexOf(Edges.find(function (e) { return e.node.User._id.toString() == after; })) + limit)
                        };
                        console.log(Response);
                        return [2 /*return*/, Response];
                }
            });
        });
    },
    user: function (_, _a, context) {
        var id = _a.id;
        return (0, user_controller_1.getUser)(id);
    }
};
exports.UserMutations = {
    createAccount: function (_, _a, context) {
        var profile = _a.profile;
        return __awaiter(this, void 0, void 0, function () {
            var _b, User, token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, user_controller_1.createAccount)(profile)];
                    case 1:
                        _b = _c.sent(), User = _b[0], token = _b[1];
                        User.token = token;
                        return [2 /*return*/, User];
                }
            });
        });
    },
    login: function (_, _a, context) {
        var loginInfo = _a.loginInfo;
        return __awaiter(this, void 0, void 0, function () {
            var _b, user, token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, user_controller_1.login)(loginInfo)];
                    case 1:
                        _b = _c.sent(), user = _b[0], token = _b[1];
                        user.token = token;
                        return [2 /*return*/, user];
                }
            });
        });
    },
    updatePhoneNumber: function (_, _a, context) {
        var phoneNumber = _a.phoneNumber, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, user_controller_1.updatePhoneNumber)(id, phoneNumber)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    updateDOB: function (_, _a, context) {
        var dob = _a.dob, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, user_controller_1.updateDOB)(id, dob)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    updateDisplayImage: function (_, _a, context) {
        var imageUrl = _a.imageUrl, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, user_controller_1.updateDisplayImage)(id, imageUrl)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    updateGender: function (_, _a, context) {
        var gender = _a.gender, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, user_controller_1.updateGender)(id, gender)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    updateSocialMediaInfo: function (_, _a, context) {
        var socialMediaInfo = _a.socialMediaInfo, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, user_controller_1.updateSocialMediaInfo)(id, socialMediaInfo)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    deleteAccount: function (_, _a, context) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = (0, user_controller_1.getUser)(id);
                        if (!user) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, user_controller_1.deleteUser)(id)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, user];
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    followUser: function (_, _a) {
        var userId = _a.userId, followerId = _a.followerId;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_model_1["default"].followUser(userId, followerId)];
                    case 1:
                        user = _b.sent();
                        console.log(user);
                        return [2 /*return*/, user];
                }
            });
        });
    },
    unFollowUser: function (_, _a) {
        var userId = _a.userId, followerId = _a.followerId;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_model_1["default"].unFollowUser(userId, followerId)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }
};
