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
exports.Notification = exports.NotificationMutations = exports.NotificationQueries = void 0;
var notification_1 = require("../../data/models/notification");
var user_model_1 = require("../../data/models/user.model");
var apollo_server_1 = require("apollo-server");
exports.NotificationQueries = {
    notifications: function (_, _a) {
        var before = _a.before, after = _a.after, limit = _a.limit;
        return __awaiter(this, void 0, void 0, function () {
            var notifications, pageInfo, Response, Edges;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, notification_1["default"].find({})
                        // console.log(notifications)
                    ];
                    case 1:
                        notifications = _b.sent();
                        // console.log(notifications)
                        if (!after && !before) {
                            after = notifications[0]._id.toString();
                        }
                        Edges = notifications.map(function (notification) {
                            // console.log(notification)
                            return ({
                                cursor: notification._id.toString(),
                                node: { Notification: notification }
                            });
                        });
                        if (before && after) {
                            throw new apollo_server_1.UserInputError("cannot use before and after inside a single query");
                        }
                        if (before) {
                            pageInfo = {
                                endCursor: notifications[Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == before; })) - limit + 1]._id.toString(),
                                hasNextPage: Edges.length % limit === 0
                            };
                            Response = {
                                pageInfo: pageInfo,
                                count: Edges.length,
                                edges: Edges.slice(Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == before; })), Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == before; })) + limit)
                            };
                        }
                        else {
                            pageInfo = {
                                endCursor: notifications[Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == after; })) + limit - 1]._id.toString(),
                                hasNextPage: Edges.length % limit === 0
                            };
                            Response = {
                                pageInfo: pageInfo,
                                count: Edges.length,
                                edges: Edges.slice(Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == after; })), Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == after; })) + limit)
                            };
                        }
                        console.log(Edges);
                        // console.log(Response)
                        return [2 /*return*/, Response];
                }
            });
        });
    },
    notification: function (_, _a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, notification_1["default"].findById(id)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    usersNotifications: function (_, _a) {
        var userId = _a.userId, limit = _a.limit, before = _a.before, after = _a.after;
        return __awaiter(this, void 0, void 0, function () {
            var notifications, pageInfo, Response, Edges;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, notification_1["default"].findUserNotifications(userId)
                        // console.log(notifications)
                    ];
                    case 1:
                        notifications = _b.sent();
                        // console.log(notifications)
                        if (!after && !before) {
                            after = notifications[0]._id.toString();
                        }
                        Edges = notifications.map(function (notification) {
                            // console.log(notification)
                            return ({
                                cursor: notification._id.toString(),
                                node: { Notification: notification }
                            });
                        });
                        if (before && after) {
                            throw new apollo_server_1.UserInputError("cannot use before and after inside a single query");
                        }
                        if (before) {
                            pageInfo = {
                                endCursor: notifications[Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == before; })) - limit + 1]._id.toString(),
                                hasNextPage: Edges.length % limit === 0
                            };
                            Response = {
                                pageInfo: pageInfo,
                                count: Edges.length,
                                edges: Edges.slice(Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == before; })), Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == before; })) + limit)
                            };
                        }
                        else {
                            pageInfo = {
                                endCursor: notifications[Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == after; })) + limit - 1]._id.toString(),
                                hasNextPage: Edges.length % limit === 0
                            };
                            Response = {
                                pageInfo: pageInfo,
                                count: Edges.length,
                                edges: Edges.slice(Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == after; })), Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == after; })) + limit)
                            };
                        }
                        console.log(Edges);
                        // console.log(Response)
                        return [2 /*return*/, Response];
                }
            });
        });
    },
    usersUnReadNotifications: function (_, _a) {
        var userId = _a.userId, before = _a.before, after = _a.after, limit = _a.limit;
        return __awaiter(this, void 0, void 0, function () {
            var notifications, pageInfo, Response, Edges;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, notification_1["default"].getUnReadNotifications(userId)
                        // console.log(notifications)
                    ];
                    case 1:
                        notifications = _b.sent();
                        // console.log(notifications)
                        if (!after && !before) {
                            after = notifications[0]._id.toString();
                        }
                        Edges = notifications.map(function (notification) {
                            // console.log(notification)
                            return ({
                                cursor: notification._id.toString(),
                                node: { Notification: notification }
                            });
                        });
                        if (before && after) {
                            throw new apollo_server_1.UserInputError("cannot use before and after inside a single query");
                        }
                        if (before) {
                            pageInfo = {
                                endCursor: notifications[Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == before; })) - limit + 1]._id.toString(),
                                hasNextPage: Edges.length % limit === 0
                            };
                            Response = {
                                pageInfo: pageInfo,
                                count: Edges.length,
                                edges: Edges.slice(Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == before; })), Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == before; })) + limit)
                            };
                        }
                        else {
                            pageInfo = {
                                endCursor: notifications[Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == after; })) + limit - 1]._id.toString(),
                                hasNextPage: Edges.length % limit === 0
                            };
                            Response = {
                                pageInfo: pageInfo,
                                count: Edges.length,
                                edges: Edges.slice(Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == after; })), Edges.indexOf(Edges.find(function (e) { return e.node.Notification._id.toString() == after; })) + limit)
                            };
                        }
                        console.log(Edges);
                        // console.log(Response)
                        return [2 /*return*/, Response];
                }
            });
        });
    }
};
exports.NotificationMutations = {
    markNotificationAsRead: function (_, _a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var Notification;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, notification_1["default"].findById(id)];
                    case 1:
                        Notification = _b.sent();
                        return [4 /*yield*/, Notification.markAsRead()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, Notification];
                }
            });
        });
    },
    markMultipleNotificationsAsRead: function (_, _a) {
        var ids = _a.ids;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, notification_1["default"].markMutlipleAsRead(ids)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, "Notifications marked"];
                }
            });
        });
    }
};
exports.Notification = {
    user: function (_) {
        return __awaiter(this, void 0, void 0, function () {
            var User;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1["default"].findById(_.userId)];
                    case 1:
                        User = _a.sent();
                        return [2 /*return*/, User];
                }
            });
        });
    }
};
