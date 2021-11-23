import { TransactionInterface, TransactionsModel } from "../../utils/interface";
import TransactionSchema from '../schemas/transaction.schema';
import * as crypto from 'crypto';
import Notifications from './notification';
import UserModel from "./user.model";
import { initializeTransaction, verifyTransaction } from "../../utils/payment-helper";
import { model } from 'mongoose';

TransactionSchema.pre('save', async function (){
  this.date = new Date().getTime.toString();
  this.transactionId = await crypto.createHash('sha256').update(this.date).digest('hex');

  if(this.type == 'buy'){
    const customer = await UserModel.findById(this.customerId);
    if(!customer){
      throw Error('No customer with that id');
    }
    const [ reference, authUrl, err ] = await initializeTransaction(customer.email, this.amount);
    if(err){
      throw Error(err)
    }
    this.reference = reference
    this.authorizationUrl = authUrl
  }
  
})


TransactionSchema.statics.verifyTransaction = async function(id){
  const Transaction = await this.findById(id);
  if(!Transaction){
    throw Error('No transation with that Id')
  }
  const [ status, err ] = await verifyTransaction(Transaction.reference);
  if(err){
    throw Error(`Opps something happened: ${err}`)
  }
  await Transaction.updateOne({ status: status });
  return { message: status } 
}

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