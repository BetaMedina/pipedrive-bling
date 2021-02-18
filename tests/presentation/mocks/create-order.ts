import { ICreateOrder } from 'src/domain/contracts'
import faker from 'faker'
export class CreateOrderStub implements ICreateOrder {
  name:String
  clientName:String
  date:Date
  value:String
  currency:String
  id: String
  async create (payload:ICreateOrder.Params):Promise<ICreateOrder.Result> {
    this.id = String(faker.random.number(99))
    this.name = payload.name
    this.clientName = payload.clientName
    this.date = payload.date
    this.value = payload.value
    this.currency = payload.currency

    return {
      id: this.id,
      name: this.name,
      clientName: this.clientName,
      date: this.date,
      value: this.value,
      currency: this.currency
    }
  }
}
