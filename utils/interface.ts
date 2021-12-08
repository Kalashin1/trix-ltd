import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';

export interface UserInterface extends Document {
  _id: ObjectId //  id of the user
  name: string // name of the user
  email: string // email of the user
  emailVerified: boolean // if they have verified their email
  phoneNumber: string // phone number of the user
  displayImage: string // displayImage of the user
  password: string // password pf the user
  createdAt: string // when they created their account timestamp
  token: string // the current JWT token of the user, useful for verification
  exchanges: string[] // swaps they have made on the platform
  emailVerificationCode: string // code for verifying email
  updateDisplayImage: (imageUrl: string) => Promise<string> // upload a display Image
  updatePhoneNumber: (phoneNumber: string) => Promise<string> // update phone number
  verifyEmail: (code: string) => Promise<boolean> // verify the users email
  // startExchange: () => Promise<any>
  // signOffExchange: () => any
  createExchange: () => any
}

export type loginInfo = {
  email: string
  password: string
}

export interface UserModelInterface extends Model<UserInterface>{
  createAccount: () => Promise<any>
  login: (info: loginInfo) => Promise<any>
  sendVerificationEmail: (email: string) => Promise<void>
}


export interface ExchangeInterface extends Document{
  exchangedCoin: string
  exchangeUnits: number
  acceptedCoin: string
  acceptedUnits: number
  date: string
  status: string // 'inProgress' | 'singnedOff' | 'initiated'
  customer: string | ObjectId // customer
  acceptedCoinWallet: string  // wallet for accepting coins
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