import { makeOrderRepository } from '../../infra/repository/order-repository'
import { GetOrderController } from '../../../../presentation/controllers/orders/get-order'

export const makeOrderController = () => {
  return new GetOrderController(makeOrderRepository())
}
