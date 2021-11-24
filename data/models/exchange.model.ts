import { ExchangeInterface, ExchangesModel } from "../../utils/interface";
import ExchangeSchema from '../schemas/exchange.schema';
import Notifications from './notification';
import { model } from "mongoose";
import UserModel from "./user.model";

ExchangeSchema.post('save', async function(){
  await Notifications.create({
    userId: this.customer,
    body: `Your Exchange has been created successfully!.`,
    type: "Account creation."
  })
})

ExchangeSchema.pre('save', async function(){
  const customer = await UserModel.findById(this.customer);
  if(!customer) throw Error('no customer exists with that id')
})

const Exchanges = model<ExchangeInterface, ExchangesModel>(
  'exchange',
  ExchangeSchema
)

export default Exchanges