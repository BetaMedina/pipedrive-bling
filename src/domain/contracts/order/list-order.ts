import { IOrderEntity } from 'src/domain/entity/order'

export interface IListOrder{
  list():Promise<IListOrder.Result>
}
export namespace IListOrder {
  export type Result = IOrderEntity[]
}
