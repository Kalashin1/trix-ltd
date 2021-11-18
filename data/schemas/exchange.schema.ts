import { Schema } from "mongoose";
import { ExchangeInterface } from "../../utils/interface";

const ExchangeSchema = new Schema<ExchangeInterface>({
  accepting: {
    type: [String],
    required: [true, 'Please provide the coins you are willing to accept.']
  },
  exchanging: {
    type: [String],
    required: [true, 'Please provide the coins you are exchanging.']
  },
  exchangedCoin: {
    type: String
  },
  exchangeUnits:{
    type: Number
  },
  acceptedCoin: {
    type: String
  },
  acceptedUnits: {
    type: Number
  },
  date: {
    type: String
  },
  status: {
    type: String
  }, // 'inProgress' | 'singnedOff' | 'initiated'
  owner: {
    type: String
  },
  customer: {
    type: String
  }
})

export default ExchangeInterface