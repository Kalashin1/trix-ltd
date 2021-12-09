import { ApolloServer , gql } from "apollo-server";
import * as mongoose from 'mongoose';
require('dotenv').config()
import { UserQueries, UserMutations, User } from "./controllers/user/user";
import { TransactionMutations, TransactionQueries } from "./controllers/transaction/transaction.controller";
import { ExchangeQueries, ExchangeMutations } from "./controllers/exchange/exchange.controller";

const url = `${process.env.DATABASE_URL}`;

const typeDefs = gql`
  type Edge {
    cursor: String
    node: Node
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }

  type Response {
    edges: [Edge]
    count: Int!
    pageInfo: PageInfo 
  }

  type Node {
    User: User
    Exchange: Exchange
    Transaction: Transaction
    Notification: Notification
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    emailVerified: Boolean
    phoneNumber: String!
    displayImage: String!
    password: String!
    createdAt: String!
    token: String!
    exchanges: [Exchange]
    transactions: [Transaction]
  }

  type Exchange {
    _id: String!
    exchangedCoin: String!
    exchangeUnits: Int!
    acceptedCoin: String!
    acceptedUnits: Int!
    acceptedCoinWallet: String!  
    date: String!
    status: String!
    customer: User!
  }

  type Transaction {
    _id: ID!
    coin: String!
    units: Int!
    amount: Int!
    type: String!
    status: String
    authorizationUrl: String
    reference: String
    transactionId: String!
    customerId: String!
    customer: User!
    date: String!
  }

  type Notification {
    _id: ID!
    user: User!
    body: String!
    isRead: Boolean!
    type: String!
    date: String!
  }

  

  type Query {
    users(before: String, after: String, limit: Int!): Response!
    user(id: String): User!
    transactions(before: String, after: String, limit: Int!): Response!
    transaction(id: String): Transaction!
    exchanges(before: String, after: String, limit: Int!): Response!
    exchange(id: String!): Exchange!
  }

  input CreateAccount {
    name: String
    email: String
    phoneNumber: String
    password: String
  }

  input LoginInfo {
    email: String
    password: String
  }

  input CreateTransaction {
    coin: String!
    units: Int!
    amount: Int!
    type: String!
    customerId: String!
    customer: String
  }

  input CreateExchange {
    exchangedCoin: String!
    exchangeUnits: Int!
    acceptedCoin: String!
    acceptedUnits: Int!
    acceptedCoinWallet: String!
    customer: String!
  }

  
  type Message {
    message: String
  }

  type Mutation{
    createAccount(profile: CreateAccount): User!
    login(loginInfo: LoginInfo): User!
    updatePhoneNumber(id: String, phoneNumber: String): Message!
    sendEmailVerificationMessage(email: String): Message!
    verifyEmail(email: String, code: String): Message!
    createTransaction(transaction: CreateTransaction): Transaction!
    addCustomerWallet(wallet: String, id:String): Message!
    verifyTransactionWithId(id:String): Message
    deleteTransactionWithId(id: String): Message
    createExchange(exchange: CreateExchange): Exchange!
  }
`

const resolvers = {
  User,
  Query: {
    ...UserQueries,
    ...TransactionQueries,
    ...ExchangeQueries,
  },

  Mutation: {
    ...UserMutations,
    ...TransactionMutations,
    ...ExchangeMutations,
  }
}

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: ({ req, res }) => ({ req, res }) 
})

// @ts-ignore
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
.then((_result: any) => server.listen().then(({ url }) => {
  console.log(url)
}))
.catch(err => console.log(err))

