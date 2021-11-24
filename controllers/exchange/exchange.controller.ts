import { UserInputError } from "apollo-server";
import Exchanges from "../../data/models/exchange.model";

export const ExchangeMutations = {

  async createExchange(_:any, { exchange }, context){
    return await Exchanges.create({...exchange})
  },
}

export const ExchangeQueries = {
  async exchanges(_:any){
    return await Exchanges.find({})
  },

  async exchange(_:any, { id }){
    return await Exchanges.findById(id)
  }
}


export default ExchangeMutations
