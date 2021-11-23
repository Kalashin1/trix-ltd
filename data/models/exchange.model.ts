import { ExchangeInterface, ExchangesModel } from "../../utils/interface";
import ExchangeSchema from '../schemas/exchange.schema';
import Notifications from './notification';
import { model } from "mongoose";

ExchangeSchema.post('save', async function(){
  await Notifications.create({
    userId: this.owner,
    body: `Your Exchange has been created successfully!.`,
    type: "Account creation."
  })
})

const Exchanges = model<ExchangeInterface, ExchangesModel>(
  'exchange',
  ExchangeSchema
)

export default Exchanges