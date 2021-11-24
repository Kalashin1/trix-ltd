import { Schema } from "mongoose";
import { ExchangeInterface } from "../../utils/interface";

const ExchangeSchema = new Schema<ExchangeInterface>({
  exchangedCoin: {
    type: String,
    required: [true, 'Please enter the coin you want to exchange.']
  },
  exchangeUnits:{
    type: Number,
    required: [true, 'Please enter the units of the token you want to exchange.']
  },
  acceptedCoin: {
    type: String,
    required: [true, 'Please provice the wallet you want to recieve the swapped coins']
  },
  acceptedUnits: {
    type: Number,
    required: [true, 'Please enter the units of the token you want to exchange.']
  },
  acceptedCoinWallet: {
    type: String,
    required: [true, 'Please provice the wallet you want to recieve the swapped coins']
  },
  date: {
    type: String,
    default: () => String(new Date().getTime())
  },
  status: {
    type: String,
    default: () => 'inProgress'
  }, // 'inProgress' | 'singnedOff' | 'initiated'
  customer: {
    type: String,
    required: [true, 'Please provice the customer that wants to make this transaction.']
  }
})

export default ExchangeSchema