import { IOrderEntity } from 'src/domain/entity/order'

export interface ICreateOrder{
  create(payload:ICreateOrder.Params):Promise<IOrderEntity>
}
export namespace ICreateOrder {
  export type Params = Omit<IOrderEntity, 'id'>
  export type Result = IOrderEntity
}
