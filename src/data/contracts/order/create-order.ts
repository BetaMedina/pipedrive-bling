import { ICreateOrder } from '../../../domain/contracts/order/create-order'

export type ICreateOrderRepository = ICreateOrder
export namespace ICreateOrderRepository{
  export type Params = ICreateOrder.Params
  export type Result = ICreateOrder.Result
}
