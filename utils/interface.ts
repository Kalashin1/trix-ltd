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
  owner: string | ObjectId
  customer: string | ObjectId
}

export interface ExchangesModel extends Model<ExchangeInterface> {
  createExchange: () => any
  signOffTransaction: () => any 
  initiateTransaction: () => any 
}

export interface TransactionInterface extends Document {
  coin: string
  units: number
  amount: number
  type: string
  status: string
  reference: string
  transactionId: string
  customer: string
  date: string
}

export interface TransactionsModel extends Model<TransactionInterface> {
  createTransaction: () => any
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