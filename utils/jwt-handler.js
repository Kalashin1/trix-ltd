"use strict";
exports.__esModule = true;
exports.createToken = exports.maxAge = exports.verifyToken = void 0;
var jwt = require("jsonwebtoken");
var maxAge = 3 * 24 * 60 * 60;
exports.maxAge = maxAge;
var createToken = function (id, secrete) {
    return jwt.sign({ id: id }, secrete, {
        expiresIn: 3 * 24 * 60 * 60
    });
};
exports.createToken = createToken;
var verifyToken = function (token, secrete) {
    return jwt.verify(token, secrete, function (error, _decodedToken) {
        if (error) {
            console.log(error);
            return false;
        }
        else {
            return _decodedToken.id;
        }
    });
};
exports.verifyToken = verifyToken;
