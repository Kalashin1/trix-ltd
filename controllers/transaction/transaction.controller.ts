import Transactions from '../../data/models/transaction.model';

export const TransactionMutations = {
  async createTransaction(_:any, transaction:any){
    return await Transactions.create({ ...transaction });
  }
}

export const TransacyionQueries = {
  async transactions(_:any){
    return await Transactions.find({});
  },

  async transaction(_:any, { id }){
    return await Transactions.findById(id);
  }
}