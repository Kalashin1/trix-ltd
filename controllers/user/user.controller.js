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
exports.deleteUser = exports.updateSocialMediaInfo = exports.updatePhoneNumber = exports.updateDisplayImage = exports.updateDOB = exports.updateGender = exports.getUser = exports.getUsers = exports.login = exports.createAccount = void 0;
var user_model_1 = require("../../data/models/user.model");
// * Create an account for the user
/**
 *
 * @function createAccount, creates a new account for a user
 * @returns the newly created object
 */
var createAccount = function (profile) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1["default"].createAccount(profile)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createAccount = createAccount;
// * Log a user in
var login = function (info) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1["default"].login(info)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// * Get all users on the platform
var getUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var Users, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1["default"].find({})];
            case 1:
                Users = _a.sent();
                // console.log(Users)
                return [2 /*return*/, Users];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
// * Get a particular user
var getUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var User, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1["default"].findById(id)];
            case 1:
                User = _a.sent();
                return [2 /*return*/, User];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
// * Update gender
var updateGender = function (id, gender) { return __awaiter(void 0, void 0, void 0, function () {
    var User, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_model_1["default"].findById(id)];
            case 1:
                User = _a.sent();
                return [4 /*yield*/, User.updateGender(gender)];
            case 2:
                _a.sent();
                return [2 /*return*/, User];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateGender = updateGender;
// * Update DOB
var updateDOB = function (id, dob) { return __awaiter(void 0, void 0, void 0, function () {
    var User, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_model_1["default"].findById(id)];
            case 1:
                User = _a.sent();
                return [4 /*yield*/, User.updateDOB(dob)];
            case 2:
                _a.sent();
                return [2 /*return*/, User];
            case 3:
                error_6 = _a.sent();
                console.log(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateDOB = updateDOB;
// * Update Display image
var updateDisplayImage = function (id, imageUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var User, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_model_1["default"].findById(id)];
            case 1:
                User = _a.sent();
                return [4 /*yield*/, User.updateDisplayImage(imageUrl)];
            case 2:
                _a.sent();
                return [2 /*return*/, User];
            case 3:
                error_7 = _a.sent();
                console.log(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateDisplayImage = updateDisplayImage;
// * Update phoneNumber
var updatePhoneNumber = function (id, phoneNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var User, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_model_1["default"].findById(id)];
            case 1:
                User = _a.sent();
                return [4 /*yield*/, User.updatePhoneNumber(phoneNumber)];
            case 2:
                _a.sent();
                return [2 /*return*/, User];
            case 3:
                error_8 = _a.sent();
                console.log(error_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updatePhoneNumber = updatePhoneNumber;
// * Update socialMediaLinks
var updateSocialMediaInfo = function (id, _socialMediaInfo) { return __awaiter(void 0, void 0, void 0, function () {
    var User, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_model_1["default"].findById(id)];
            case 1:
                User = _a.sent();
                return [4 /*yield*/, User.updateSocialMediaInfo(_socialMediaInfo)];
            case 2:
                _a.sent();
                return [2 /*return*/, User];
            case 3:
                error_9 = _a.sent();
                console.log(error_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateSocialMediaInfo = updateSocialMediaInfo;
// * delete a user 
var deleteUser = function (_id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1["default"].remove({ _id: _id })];
            case 1:
                _a.sent();
                return [2 /*return*/, "User Deleted!"];
            case 2:
                error_10 = _a.sent();
                console.log(error_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
