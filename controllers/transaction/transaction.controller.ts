import Transactions from '../../data/models/transaction.model';
import { verifyTransaction } from '../../utils/payment-helper';
import { UserInputError } from 'apollo-server';

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
  async transactions(_:any, { before, after, limit }){

    const transactions = await Transactions.find({});
    // console.log(context.req.headers.usertoken);
    /**
     * * If before and after is not provided throw an error 
     */
     if(! before && (!after)){
      throw new UserInputError('before or after must be provided')
    }
    /**
     * * if no limit is provided use the default limit.
     */
    if(!limit){
      limit == 5  // * TODO change this limit to 10 later
    }
    /**
     * * if before and after is provided at the same time, throw an error.
     */
    if(before && after){
      after = transactions[0].date
    }
    /**
     * * if only before is provided,
     */

    if(before && (! after )){
      // * get the current cursor the user passed in
      const currentCursor = transactions.find(transaction => transaction.date == before).date;
      // * Map the edges 
      const Edges = transactions.map(transaction => {
        return {
          cursor: transaction.date,
          node: { Transaction: transaction }
        }
      })

      console.log(Edges[0].node.Transaction.date)
      // * Generate page info
      const pageInfo = {
        endCursor: transactions[
          transactions.indexOf(transactions.find(transaction => transaction.date == before)) - limit + 1
        ].date,

        hasNextPage: () => {

          const endCursor = transactions.indexOf(transactions.find(transaction => transaction.date == before)) - limit + 1

          // console.log(transactions.slice(0, endCursor).length, limit)
          if(transactions.slice(0, endCursor).length >= limit){
            return true
          } else {
            return false;
          }
        } // TODO this should be determined programiatically hasNext page
      }

      // get the end cursor, check if there are "limit" number of items in the array after the end cursor

      // * Generate a response
      const Response = {
        count: Edges.length,
        pageInfo,
        edges: Edges.slice(
          // * Get n number of edges after the cursor
          Edges.indexOf(
            Edges.find(e => e.node.Transaction.date == before )
          ) - limit,
          // * Stop at the cursor
          Edges.indexOf(
            Edges.find(e => e.node.Transaction.date == before )
          )
        )
      }
      return Response
    }

    if(!before && (after)){
      // * get the current cursor the user passed in
      const currentCursor = transactions.find(transaction => transaction.date == after).date;
      // * Map the edges 
      const Edges = transactions.map(transaction => {
        return {
          cursor: transaction.date,
          node: { Transaction: transaction }
        }
      })
      // * Generate page info
      const pageInfo = {
        endCursor: transactions[
          transactions.indexOf(transactions.find(transaction => transaction.date == after))
        ].date,

       hasNextPage: () => {

          const endCursor = transactions.indexOf(transactions.find(transaction => transaction.date == after)) + limit
          console.log(transactions.slice(endCursor, transactions.length).length, limit)
          if(transactions.slice(endCursor, transactions.length).length >= limit){
            return true
          } else {
            return false;
          }
        } // TODO this should be determined programiatically
      }

      // * Generate a response
      const Response = {
        count: Edges.length,
        pageInfo,
        edges: Edges.slice(
          // * Stop at the cursor
          Edges.indexOf(
            Edges.find(e => e.node.Transaction.date == after )
          ),
          // * Get n number of edges before the cursor
          Edges.indexOf(
            Edges.find(e => e.node.Transaction.date == after )
          ) + limit 
        )
      }
      return Response
    }
  },

  async transaction(_:any, { id }){
    return await Transactions.findById(id);
  }
}