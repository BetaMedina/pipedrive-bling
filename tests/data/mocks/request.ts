import { IRequestAdapter } from '../../../src/data/contracts/adapters/request/request-adapter'

export class RequestStub implements IRequestAdapter {
  headers:any
  payload:any
  url:String
  async get (payload: IRequestAdapter.Params): Promise<IRequestAdapter.Result> {
    return {
      status: 200
    }
  }

  async post (payload: IRequestAdapter.Params): Promise<IRequestAdapter.Result> {
    this.headers = payload.url
    this.payload = payload.body
    this.url = payload.url
    return {
      status: 201,
      data: 'validData'
    }
  }
}
