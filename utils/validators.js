"use strict";
exports.__esModule = true;
exports.isPassword = exports.isEmail = void 0;
//  validating email
var isEmail = function (val) {
    return new RegExp(/^[\w]+(\.[\w]+)*@([\w]+\.)+[a-z]{2,7}$/).test(val);
};
exports.isEmail = isEmail;
// // validating passwords
var isPassword = function (val) {
    return new RegExp(/([a-z]?[A-Z]+[a-z]+[0-9]+)/).test(val);
};
exports.isPassword = isPassword;
