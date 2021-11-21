import { ExchangeInterface, ExchangesModel } from "../../utils/interface";
import ExchangeSchema from '../schemas/exchange.schema';
import { model } from "mongoose";


const Exchanges = model<ExchangeInterface, ExchangesModel>(
  'exchange',
  ExchangeSchema
)

export default Exchanges