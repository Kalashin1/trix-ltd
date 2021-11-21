import { UserInputError } from "apollo-server";
import Exchanges from "../../data/models/exchange.model";

const ExchangeMutations = {

  async createExchange(_:any, { exchange }, context){
    return await Exchanges.create({...exchange})
  },
}

export const ExchangeQueries = {
  async exchnages(_:any, params: any){
    return await Exchanges.find({})
  }
}


export default ExchangeMutations
