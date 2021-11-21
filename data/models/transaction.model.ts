import { TransactionInterface, TransactionsModel } from "../../utils/interface";
import TransactionSchema from '../schemas/transaction.schema';
import { model } from 'mongoose';


const Transactions = model<TransactionInterface, TransactionsModel>(
  'transaction',
  TransactionSchema
)

export default Transactions