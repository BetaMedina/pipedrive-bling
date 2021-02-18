import { makeOrderRepository } from '../../infra/repository/order-repository'
import { makeBlingCreateOrder } from '../../data/use-cases/bling-create-order'
import { WebhookController } from '../../../../presentation/controllers/webhook-pipedrive/create-order'

export const makeWebhookOrderController = () => {
  return new WebhookController(makeBlingCreateOrder(), makeOrderRepository())
}
