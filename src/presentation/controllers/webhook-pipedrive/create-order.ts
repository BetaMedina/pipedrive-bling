import { IHttpRequest, IHttpResponse } from '../../../presentation/contracts'
import { badRequest, serverError, successResponse } from '../../../presentation/helpers/http/http-helper'
import { IControllerInterface } from '../../../presentation/contracts/controller'
import { IBlingCreateOrder, ICreateOrder } from '../../../domain/contracts'

export class WebhookController implements IControllerInterface {
  constructor (private readonly bling:IBlingCreateOrder, private readonly order:ICreateOrder) {}

  async handle (httpRequest:IHttpRequest):Promise<IHttpResponse> {
    try {
      const { body: { current } } = httpRequest
      const blingResponse = await this.bling.createOrder({
        clientName: current.person_name,
        code: current.id,
        description: current.title,
        value: current.value
      })

      if (blingResponse.status !== 201) {
        return badRequest({ bling: blingResponse.error || 'Order cannot be entered into the bling' })
      }
      
      await this.order.create({
        name: current.title,
        clientName: current.person_name,
        date: current.update_time,
        value: current.value,
        currency: current.currency
      })
      return successResponse({ success: 'Order has been register' })
    } catch (err) {
      return serverError(err)
    }
  }
}
