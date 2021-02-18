import { IListOrder } from '../../../src/domain/contracts/order/list-order'
import faker from 'faker'

export class ListOrderStub implements IListOrder {
  name:String
  clientName:String
  date:Date
  value:String
  currency:String
  id: String

  async list ():Promise<IListOrder.Result> {
    this.id = String(faker.random.number(99))
    this.name = faker.name.firstName()
    this.clientName = faker.name.firstName()
    this.date = faker.date.past()
    this.value = faker.finance.amount()
    this.currency = faker.finance.currencyCode()

    return [{
      id: this.id,
      name: this.name,
      clientName: this.clientName,
      date: this.date,
      value: this.value,
      currency: this.currency
    }]
  }
}
