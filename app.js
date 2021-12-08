"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var mongoose = require("mongoose");
require('dotenv').config();
var user_1 = require("./controllers/user/user");
var transaction_controller_1 = require("./controllers/transaction/transaction.controller");
var exchange_controller_1 = require("./controllers/exchange/exchange.controller");
var url = "" + process.env.DATABASE_URL;
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Edge {\n    cursor: String\n    node: Node\n  }\n\n  type PageInfo {\n    endCursor: String\n    hasNextPage: Boolean\n  }\n\n  type Response {\n    edges: [Edge]\n    count: Int!\n    pageInfo: PageInfo \n  }\n\n  type Node {\n    User: User\n    Exchange: Exchange\n    Transaction: Transaction\n    Notification: Notification\n  }\n\n  type User {\n    _id: ID!\n    name: String!\n    email: String!\n    emailVerified: Boolean\n    phoneNumber: String!\n    displayImage: String!\n    password: String!\n    createdAt: String!\n    token: String!\n    exchanges: [Exchange]!\n    transactions: [Transaction]!\n  }\n\n  type Exchange {\n    _id: String!\n    exchangedCoin: String!\n    exchangeUnits: Int!\n    acceptedCoin: String!\n    acceptedUnits: Int!\n    acceptedCoinWallet: String!  \n    date: String!\n    status: String!\n    customer: User!\n  }\n\n  type Transaction {\n    _id: ID!\n    coin: String!\n    units: Int!\n    amount: Int!\n    type: String!\n    status: String\n    authorizationUrl: String\n    reference: String\n    transactionId: String!\n    customerId: String!\n    customer: User!\n    date: String!\n  }\n\n  type Notification {\n    _id: ID!\n    user: User!\n    body: String!\n    isRead: Boolean!\n    type: String!\n    date: String!\n  }\n\n  \n\n  type Query {\n    users(before: String, after: String, limit: Int!): Response!\n    user(id: String): User!\n    transactions(before: String, after: String, limit: Int!): Response!\n    transaction(id: String): Transaction!\n    exchanges(before: String, after: String, limit: String): Response!\n    exchange(id: String!): Exchange!\n  }\n\n  input CreateAccount {\n    name: String\n    email: String\n    phoneNumber: String\n    password: String\n  }\n\n  input LoginInfo {\n    email: String\n    password: String\n  }\n\n  input CreateTransaction {\n    coin: String!\n    units: Int!\n    amount: Int!\n    type: String!\n    customerId: String!\n    customer: String\n  }\n\n  input CreateExchange {\n    exchangedCoin: String!\n    exchangeUnits: Int!\n    acceptedCoin: String!\n    acceptedUnits: Int!\n    acceptedCoinWallet: String!\n    customer: String!\n  }\n\n  \n  type Message {\n    message: String\n  }\n\n  type Mutation{\n    createAccount(profile: CreateAccount): User!\n    login(loginInfo: LoginInfo): User!\n    updatePhoneNumber(id: String, phoneNumber: String): Message!\n    sendEmailVerificationMessage(email: String): Message!\n    verifyEmail(email: String, code: String): Message!\n    createTransaction(transaction: CreateTransaction): Transaction!\n    addCustomerWallet(wallet: String, id:String): Message!\n    verifyTransactionWithId(id:String): Message\n    deleteTransactionWithId(id: String): Message\n    createExchange(exchange: CreateExchange): Exchange!\n  }\n"], ["\n  type Edge {\n    cursor: String\n    node: Node\n  }\n\n  type PageInfo {\n    endCursor: String\n    hasNextPage: Boolean\n  }\n\n  type Response {\n    edges: [Edge]\n    count: Int!\n    pageInfo: PageInfo \n  }\n\n  type Node {\n    User: User\n    Exchange: Exchange\n    Transaction: Transaction\n    Notification: Notification\n  }\n\n  type User {\n    _id: ID!\n    name: String!\n    email: String!\n    emailVerified: Boolean\n    phoneNumber: String!\n    displayImage: String!\n    password: String!\n    createdAt: String!\n    token: String!\n    exchanges: [Exchange]!\n    transactions: [Transaction]!\n  }\n\n  type Exchange {\n    _id: String!\n    exchangedCoin: String!\n    exchangeUnits: Int!\n    acceptedCoin: String!\n    acceptedUnits: Int!\n    acceptedCoinWallet: String!  \n    date: String!\n    status: String!\n    customer: User!\n  }\n\n  type Transaction {\n    _id: ID!\n    coin: String!\n    units: Int!\n    amount: Int!\n    type: String!\n    status: String\n    authorizationUrl: String\n    reference: String\n    transactionId: String!\n    customerId: String!\n    customer: User!\n    date: String!\n  }\n\n  type Notification {\n    _id: ID!\n    user: User!\n    body: String!\n    isRead: Boolean!\n    type: String!\n    date: String!\n  }\n\n  \n\n  type Query {\n    users(before: String, after: String, limit: Int!): Response!\n    user(id: String): User!\n    transactions(before: String, after: String, limit: Int!): Response!\n    transaction(id: String): Transaction!\n    exchanges(before: String, after: String, limit: String): Response!\n    exchange(id: String!): Exchange!\n  }\n\n  input CreateAccount {\n    name: String\n    email: String\n    phoneNumber: String\n    password: String\n  }\n\n  input LoginInfo {\n    email: String\n    password: String\n  }\n\n  input CreateTransaction {\n    coin: String!\n    units: Int!\n    amount: Int!\n    type: String!\n    customerId: String!\n    customer: String\n  }\n\n  input CreateExchange {\n    exchangedCoin: String!\n    exchangeUnits: Int!\n    acceptedCoin: String!\n    acceptedUnits: Int!\n    acceptedCoinWallet: String!\n    customer: String!\n  }\n\n  \n  type Message {\n    message: String\n  }\n\n  type Mutation{\n    createAccount(profile: CreateAccount): User!\n    login(loginInfo: LoginInfo): User!\n    updatePhoneNumber(id: String, phoneNumber: String): Message!\n    sendEmailVerificationMessage(email: String): Message!\n    verifyEmail(email: String, code: String): Message!\n    createTransaction(transaction: CreateTransaction): Transaction!\n    addCustomerWallet(wallet: String, id:String): Message!\n    verifyTransactionWithId(id:String): Message\n    deleteTransactionWithId(id: String): Message\n    createExchange(exchange: CreateExchange): Exchange!\n  }\n"])));
var resolvers = {
    Query: __assign(__assign(__assign({}, user_1.UserQueries), transaction_controller_1.TransactionQueries), exchange_controller_1.ExchangeQueries),
    Mutation: __assign(__assign(__assign({}, user_1.UserMutations), transaction_controller_1.TransactionMutations), exchange_controller_1.ExchangeMutations)
};
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: function (_a) {
        var req = _a.req, res = _a.res;
        return ({ req: req, res: res });
    }
});
// @ts-ignore
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (_result) { return server.listen().then(function (_a) {
    var url = _a.url;
    console.log(url);
}); })["catch"](function (err) { return console.log(err); });
var templateObject_1;
