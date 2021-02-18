import { IBlingCreateOrder } from 'src/domain/contracts'

export class BlingCreateOrderStub implements IBlingCreateOrder {
  clientName:String
  code:String
  description:String
  value:String
  async createOrder (payload:IBlingCreateOrder.Params):Promise<IBlingCreateOrder.Result> {
    this.clientName = payload.clientName
    this.code = payload.code
    this.description = payload.description
    this.value = payload.value

    return {
      status: 201
    }
  }
}
