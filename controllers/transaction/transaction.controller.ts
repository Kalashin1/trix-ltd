import Transactions from '../../data/models/transaction.model';
import { verifyTransaction } from '../../utils/payment-helper';

export const TransactionMutations = {
  async createTransaction(_:any, { transaction }){
    // console.log(transaction)
    return await Transactions.create({ ...transaction });
  },

  async verifyTransactionWithId(_:any, { id }){
    return await Transactions.verifyTransaction(id);
  },

  async deleteTransactionWithId(_:any, { id }){
    await Transactions.deleteOne({ _id: id})
    return { message : 'successful' }
  },

  async addCustomerWallet(_:any, { id, wallet }){
    try {
      const Transaction = await Transactions.findById(id)
      const message = await Transaction.addCustomer(wallet)
      return message
    } catch (error) {
      console.log(error)
    }
  }
}

export const TransactionQueries = {
  async transactions(_:any){
    return await Transactions.find({});
  },

  async transaction(_:any, { id }){
    return await Transactions.findById(id);
  }
}