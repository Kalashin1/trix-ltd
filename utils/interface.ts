import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';

export interface UserInterface extends Document {
  _id: ObjectId
  name: string
  email: string
  emailVerified: boolean
  phoneNumber: string
  displayImage: string
  password: string
  createdAt: string
  token: string
  exchanges: string[]
  emailVerificationCode: number
  updateDisplayImage: (imageUrl: string) => Promise<string>
  updatePhoneNumber: (phoneNumber: string) => Promise<string>
  verifyEmail: (code: number) => Promise<boolean>
  startExchange: () => Promise<any>
  signOffExchange: () => any
  buyCrypto: () => any
  sellCrypto: () => any
  createExchange: () => any
}

export type loginInfo = {
  email: string
  password: string
}

export interface UserModelInterface extends Model<UserInterface>{
  createAccount: () => Promise<any>
  login: (info: loginInfo) => Promise<any>
  sendVerificationEmail: (email: string) => Promise<string>
  buyCrypto: () => any
  sellCrypto: () => any
  createExchange: () => any
  startExchange: (userId: string, followerId: string) => Promise<UserInterface>
}


export interface ExchangeInterface extends Document{
  accepting: string[]
  exchanging: string[]
  exchangedCoin: string
  exchangeUnits: number
  acceptedCoin: string
  acceptedUnits: number
  date: string
  status: string // 'inProgress' | 'singnedOff' | 'initiated'
  owner: string | ObjectId // customerId or TrixId
  customer: string | ObjectId
}

export interface ExchangesModel extends Model<ExchangeInterface> {
  createExchange: () => any
  signOffTransaction: () => any 
  initiateTransaction: () => any 
}

export interface TransactionInterface extends Document {
  authorizationUrl: string // url to complete the process
  coin: string // the token the person wanted to purchase
  units: number // the number of tokens the customer will recieve or sell.
  amount: number // The amount of the transaction
  currency: string // The currency of the transaction
  type: string // will be buy or sell
  status: string  // will hold the status of the transaction
  reference: string // will hold the id of the transaction from the API, different from the Id in the db.
  transactionId: string // A TimeStamp that can also be used to obtain a transaction, different from the _id.
  customer: string // The wallet of the customer that made the transaction
  customerId: string // the id of the customer
  date: string // TimeStamp of when the transaction occured.
  addCustomer: (wallet: string) => Promise<string> // add a customer's wallet to the transaction
}

export interface TransactionsModel extends Model<TransactionInterface> {
  createTransaction: () => Promise<TransactionInterface>
  verifyTransaction: (id: string) => Promise<string>
}

export interface INotification extends Document {
  _id: ObjectId
  userId: string
  body: string
  isRead: boolean
  type: string
  date: string
  markAsRead: () => void
}
/**
 * @interface NotificationModel interface for notification model
 */
export interface NotificationModel extends Model<INotification> {
  markMutlipleAsRead: (notificationId: string[]) => Promise<void>
  findUserNotifications: (userId: string) => Promise<INotification[]> 
  getUnReadNotifications: (userId: string) => Promise<INotification[]> 
}