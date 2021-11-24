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
exports.verifyTransaction = exports.initializeTransaction = void 0;
var axios_1 = require("axios");
/**
 * @function initializeTransaction to start a transaction
 * @param email the email to send the details of the transaction to
 * @param amount the amount the user is paying for
 * @returns an array, if there is no error the array contains the reference to the transaction, the authorization_url for completing the transaction and null for error. If there is an error with the network request, the reference and authorization url is null while there is a value for error
 */
var initializeTransaction = function (email, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, axios_1["default"])({
                    method: 'post',
                    url: 'https://api.paystack.co/transaction/initialize',
                    headers: {
                        'Authorization': "Bearer " + process.env.PAYSTACK_PRIVATE_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({ email: email, amount: amount })
                })];
            case 1:
                res = _a.sent();
                if (!(res.status == (200 || 201))) return [3 /*break*/, 3];
                console.log(res.status);
                return [4 /*yield*/, res.data
                    //  console.log(data)
                ];
            case 2:
                data = _a.sent();
                //  console.log(data)
                return [2 /*return*/, [data.data.reference, data.data['authorization_url'], null]];
            case 3: return [4 /*yield*/, res.data];
            case 4:
                data = _a.sent();
                console.log(res.status, data);
                return [2 /*return*/, [null, null, data]];
        }
    });
}); };
exports.initializeTransaction = initializeTransaction;
/**
 * @function verifyTransaction to check the status of a transaction
 * @param reference the of the transaction
 * @returns an array, if there is no error the array contains the status of the transaction and null for error. If there is an error with the network request, the status is null while there is a value for error
 */
var verifyTransaction = function (reference) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, axios_1["default"])({
                    method: 'get',
                    url: "https://api.paystack.co/transaction/verify/" + reference,
                    headers: {
                        'Authorization': "Bearer " + process.env.PAYSTACK_PRIVATE_API_KEY
                    }
                })];
            case 1:
                res = _a.sent();
                if (!(res.status === (200 || 201))) return [3 /*break*/, 3];
                console.log(res.status);
                return [4 /*yield*/, res.data];
            case 2:
                data = _a.sent();
                console.log(data);
                return [2 /*return*/, [data.data.status, null]];
            case 3: return [4 /*yield*/, res.data];
            case 4:
                data = _a.sent();
                console.log(data);
                return [2 /*return*/, [null, data]];
        }
    });
}); };
exports.verifyTransaction = verifyTransaction;
