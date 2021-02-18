export interface IBlingCreateOrder{
  createOrder(payload:IBlingCreateOrder.Params):Promise<IBlingCreateOrder.Result>
}

export namespace IBlingCreateOrder {
  export type Params ={
    clientName:String
    code:String
    description:String
    value:String
  }
  export type Result = {
    error?:String,
    status:Number
  }
}
