import { OrderRepository } from '../../../../infra/db/mongo/repository/order-repository'

export const makeOrderRepository = () => {
  return new OrderRepository()
}
