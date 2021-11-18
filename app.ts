import { ApolloServer , gql } from "apollo-server";
import * as mongoose from 'mongoose';
require('dotenv').config()

import ArticleMutations from "./controllers/article/article.controller";
import { ArticleQueries, Article } from "./controllers/article/article.controller";
import { CommentQueries, CommentMutations, Comment } from "./controllers/comment/comment.controller";
import { NotificationQueries, NotificationMutations, Notification } from "./controllers/notification/notification.controller";
import { UserMutations, UserQueries, User } from "./controllers/user/user";
const url = 'mongodb://localhost:27017/trix-ltd'

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
    Article: Article
    Comment: Comment
    Notification: Notification
  }

  type User {
    name: String!
    _id: ID!
    email: String!
    emailVerified: String!
    phoneNumber: String!
    displayImage: String!
    gender: String!
    dob: String!
    token: String!
    createdAt: String!
    socialMediaInfo: _SocialMediaInfo
    savedArticles: [Article]
    articles: [Article]
    followers: [User]!
    notifications: [Notification!]!
    following: [User]!
  }
  

  type Article {
    _id: ID
    title: String!
    createdAt: String!
    updatedAt: String!
    body: String!
    socialImage: String!
    url: String!
    tags: [String!]!
    category: String!
    views: Int!
    readingTime: String!
    likes: Int!
    dislikes: Int!
    saves: Int!
    thumbsUp: Int!
    author: String!
    comments: [Comment!]!
  }

  type Comment {
    _id: ID
    createdAt: String!
    updatedAt: String!
    body: String!
    userId: String!
    user: User!
    parentCommentId: String
    articleId: String!
    likes: Int!
    comments: [Comment]!
  }

  type Notification {
    _id: ID!
    user: User!
    body: String!
    isRead: Boolean!
    type: String!
    date: String!
  }

  type _SocialMediaInfo {
    facebook: String!
    twitter: String!
    instagram: String!
  }

  type Query {
    users(after: String, limit: Int!): Response!
    user(id: String): User!
    articles(after: String, limit: Int!, before: String): Response!
    article(id: String): Article!
    comments(articleId: String, limit: Int!, before: String, after: String): Response!
    comment(id: String): Comment!
    notifications(limit: Int!, before: String, after: String): Response!
    notification(id: String): Notification!
    usersNotifications(userId: String, limit: Int!, before: String, after: String): Response!
    usersUnReadNotifications(userId: String, limit: Int!, before: String, after: String): Response!
  }

  input CreateAccount {
    name: String
    email: String
    phoneNumber: String
    gender: String
    password: String
  }

  input LoginInfo{
    email: String
    password: String
  }

  input SocialMediaInfo {
    facebook: String
    twitter: String
    instagram: String
  }

  input CreateArticleInput {
    title: String!
    body: String!
    tags: [String!]!
    category: String!
    author: String!
    socialImage: String
    _id: String
  }

  input CreateComment {
    _id: ID
    userId: String!
    articleId: String!
    body: String!
    parentCommentId: String
  }

  type Mutation{
    createAccount(profile: CreateAccount): User!
    login(loginInfo: LoginInfo): User!
    updateDOB(id: String, dob: String): User!
    updateDisplayImage(id: String, imageUrl: String): User!
    updateSocialMediaInfo(id: String, socialMediaInfo: SocialMediaInfo): User!
    updatePhoneNumber(id: String, phoneNumber: String): User!
    updateGender(id: String, gender: String): User!
    deleteAccount(id: String): User!
    followUser(userId: String, followerId: String): User!
    unFollowUser(userId: String, followerId: String): User!
    createArticle(article: CreateArticleInput): Article
    updateArticle(article: CreateArticleInput): Article
    deleteArticle(article: CreateArticleInput): Article
    toggleLikes(articleId: String, userId: String, optn: String): Article
    toggleSaves(articleId: String, userId: String, optn: String): Article
    toggleViews(articleId: String, userId: String, optn: String): Article
    createComment(comment: CreateComment): Comment
    editComment(comment: CreateComment): Comment
    deleteComment(comment: CreateComment): Comment
    createChildComment(comment: CreateComment): Comment 
    likeComment(userId: String, optn: String, commentId: String): Comment
    markNotificationAsRead(id: String): Notification
    markMultipleNotificationsAsRead(ids: [String!]!): String
  }
`

const resolvers = {
  User,
  Article,
  Comment,
  Notification,
  Query : {
    ...UserQueries,
    ...ArticleQueries,
    ...NotificationQueries,
    ...CommentQueries
  },

  Mutation: {
    ...UserMutations,
    ...ArticleMutations,
    ...CommentMutations,
    ...NotificationMutations
  }
}

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: ({ req, res }) => ({ req, res }) 
})

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
.then((_result: any) => server.listen().then(({ url }) => {
  console.log(url)
}))
.catch(err => console.log(err))

