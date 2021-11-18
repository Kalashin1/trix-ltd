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
exports.Comment = exports.CommentMutations = exports.CommentQueries = void 0;
var comment_model_1 = require("../../data/models/comment.model");
var user_model_1 = require("../../data/models/user.model");
var apollo_server_1 = require("apollo-server");
exports.CommentQueries = {
    comments: function (_, _a) {
        var articleId = _a.articleId, limit = _a.limit, after = _a.after, before = _a.before;
        return __awaiter(this, void 0, void 0, function () {
            var comments, pageInfo, Response, Edges;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1["default"].find({ articleId: articleId })
                        // console.log(comments)
                    ];
                    case 1:
                        comments = _b.sent();
                        // console.log(comments)
                        if (!after && !before) {
                            after = comments[0]._id.toString();
                        }
                        Edges = comments.map(function (comment) {
                            // console.log(comment)
                            return ({
                                cursor: comment._id.toString(),
                                node: { Comment: comment }
                            });
                        });
                        if (before && after) {
                            throw new apollo_server_1.UserInputError("cannot use before and after inside a single query");
                        }
                        if (before) {
                            pageInfo = {
                                endCursor: comments[Edges.indexOf(Edges.find(function (e) { return e.node.Comment._id.toString() == before; })) - limit + 1]._id.toString(),
                                hasNextPage: Edges.length % limit === 0
                            };
                            Response = {
                                pageInfo: pageInfo,
                                count: Edges.length,
                                edges: Edges.slice(Edges.indexOf(Edges.find(function (e) { return e.node.Comment._id.toString() == before; })), Edges.indexOf(Edges.find(function (e) { return e.node.Comment._id.toString() == before; })) + limit)
                            };
                        }
                        else {
                            pageInfo = {
                                endCursor: comments[Edges.indexOf(Edges.find(function (e) { return e.node.Comment._id.toString() == after; })) + limit - 1]._id.toString(),
                                hasNextPage: Edges.length % limit === 0
                            };
                            Response = {
                                pageInfo: pageInfo,
                                count: Edges.length,
                                edges: Edges.slice(Edges.indexOf(Edges.find(function (e) { return e.node.Comment._id.toString() == after; })), Edges.indexOf(Edges.find(function (e) { return e.node.Comment._id.toString() == after; })) + limit)
                            };
                        }
                        console.log(Edges);
                        // console.log(Response)
                        return [2 /*return*/, Response];
                }
            });
        });
    },
    comment: function (_, _a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1["default"].findById(id)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    }
};
exports.CommentMutations = {
    createComment: function (_, _a) {
        var comment = _a.comment;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1["default"].createComment(comment)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    editComment: function (_, _a) {
        var comment = _a.comment;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1["default"].editComment(comment)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    deleteComment: function (_, _a) {
        var comment = _a.comment;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1["default"].deleteComment(comment)];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    likeComment: function (_, _a) {
        var userId = _a.userId, optn = _a.optn, commentId = _a.commentId;
        return __awaiter(this, void 0, void 0, function () {
            var Comment;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1["default"].findById(commentId)];
                    case 1:
                        Comment = _b.sent();
                        return [4 /*yield*/, Comment.likeComment(userId, optn)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    },
    createChildComment: function (_, _a) {
        var comment = _a.comment;
        return __awaiter(this, void 0, void 0, function () {
            var Comment;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, comment_model_1["default"].findById(comment.parentCommentId)];
                    case 1:
                        Comment = _b.sent();
                        if (!Comment) return [3 /*break*/, 3];
                        return [4 /*yield*/, Comment.comment(comment)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: throw Error('No comment exists with that id');
                }
            });
        });
    }
};
exports.Comment = {
    comments: function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            var comments;
            return __generator(this, function (_a) {
                comments = comment_model_1["default"].find({ parentCommentId: parent._id });
                return [2 /*return*/, comments];
            });
        });
    },
    user: function (parent) {
        return __awaiter(this, void 0, void 0, function () {
            var User;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1["default"].findById(parent.userId)];
                    case 1:
                        User = _a.sent();
                        return [2 /*return*/, User];
                }
            });
        });
    }
};
