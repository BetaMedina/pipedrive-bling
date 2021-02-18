import { IHttpResponse } from '../../../presentation/contracts'
import { IControllerInterface } from '../../../presentation/contracts/controller'
import { successResponse, emptyResponse, serverError } from '../../../presentation/helpers/http/http-helper'
import { IListOrder } from '../../../domain/contracts/order/list-order'

export class GetOrderController implements IControllerInterface {
  constructor (private readonly order:IListOrder) {}
  async handle (): Promise<IHttpResponse> {
    try {
      const registeredOrders = await this.order.list()
      if (!registeredOrders.length) {
        return emptyResponse()
      }
      return successResponse(registeredOrders)
    } catch (err) {
      return serverError(err)
    }
  }
}
