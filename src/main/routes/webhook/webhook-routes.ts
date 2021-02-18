import { Router } from 'express'
import { adaptRoute } from '../../adapters/express-router-adapter'
import { makeWebhookOrderController } from '../../factories/presentation/webhook/webhook-order-factory'
import { makeOrderController } from '../../factories/presentation/order/list-order-factory'

export default (route: Router):void => {
  route.post('/webhook', adaptRoute(makeWebhookOrderController()))
  route.get('/orders', adaptRoute(makeOrderController()))
}
