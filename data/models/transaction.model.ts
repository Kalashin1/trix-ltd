import { TransactionInterface, TransactionsModel } from "../../utils/interface";
import TransactionSchema from '../schemas/transaction.schema';
import * as crypto from 'crypto';
import Notifications from './notification';
import { model } from 'mongoose';

TransactionSchema.pre('save', async function (){
  this.date = new Date().getTime.toString();
  this.transactionId = await crypto.createHash('sha256').update(this.date).digest('hex');
})

TransactionSchema.methods.addCustomer = async function (customer) {
  if(!this.customer){
    await this.updateOne({ customer: customer });
    return { message: 'Wallet provided successfully'}; 
  }
  throw new Error('Wallet already provided!');
}

TransactionSchema.post('save', async function(){
  await Notifications.create({
    userId: this.customerId,
    body: `Your ${this.type} transaction has been processed successfully, you will get your tokens in a minute.!.`,
    type: "Payment."
  })
})


const Transactions = model<TransactionInterface, TransactionsModel>(
  'transaction',
  TransactionSchema
)

export default Transactions