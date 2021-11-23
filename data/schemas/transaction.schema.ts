import { Schema } from "mongoose";
import { TransactionInterface } from "../../utils/interface";

const TransactionSchema = new Schema<TransactionInterface>({
  coin: {
    type: String,
    required: [true, 'Please select the coin you want to buy']
  },
  units: {
    type: Number,
    required: [true, 'Please select the amount of tokens you want to buy.']
  },
  amount: {
    type: Number
  },
  type: {
    type: String,
    required: [true, 'Please select the type of transaction you want to make.']
  },
  status: {
    type: String
  },
  reference: {
    type: String
  },
  transactionId: {
    type: String
  },
  customer: {
    type: String
  },
  customerId: {
    type: String,
    required: [true, 'Please provide the customer this transaction belongs to,']
  },
  date: {
    type: String
  },
  authorizationUrl: {
    type: String
  }
})

export default TransactionSchema