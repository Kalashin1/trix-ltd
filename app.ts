import { ApolloServer , gql } from "apollo-server";
import * as mongoose from 'mongoose';
require('dotenv').config()
import { UserQueries, UserMutations } from "./controllers/user/user";

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
    exchanges: [String!]!
    emailVerificationCode: Int!
  }

  type Exchange {
    accepting: [String!]!
    exchanging: [String!]!
    exchangedCoin: String!
    exchangeUnits: Int!
    acceptedCoin: String!
    acceptedUnits: Int!
    date: String!
    status: String!
    owner: User!
    customer: User!
  }

  type Transaction {
    coin: String!
    units: Int!
    amount: Int!
    type: String!
    status: String!
    reference: String!
    transactionId: String!
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
    users: [User!]!
    user(id: String): User!
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
  
  type Message {
    message: String
  }

  type Mutation{
    createAccount(profile: CreateAccount): User!
    login(loginInfo: LoginInfo): User!
    updatePhoneNumber(id: String, phoneNumber: String): Message!
  }
`

const resolvers = {
  Query: {
    ...UserQueries,
  },

  Mutation: {
    ...UserMutations,
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

