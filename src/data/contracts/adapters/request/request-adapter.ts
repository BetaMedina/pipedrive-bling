export type IRequestAdapter ={
  get(payload:IRequestAdapter.Params):Promise<IRequestAdapter.Result>
  post(payload:IRequestAdapter.Params):Promise<IRequestAdapter.Result>
}

export namespace IRequestAdapter{
  export type Params = {
    url:String,
    options?:{
      headers?: any
      params?:any
    },
    body?: any,
  }
  export type Result = {
    data?:any,
    status: Number,
    error?:any
  }
}
