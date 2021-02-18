import axios from 'axios'
import { IRequestAdapter } from '../../../data/contracts/adapters/request/request-adapter'

export class AxiosAdapter implements IRequestAdapter {
  async get (payload:IRequestAdapter.Params):Promise<IRequestAdapter.Result> {
    const axiosResponse = await axios.get(String(payload.url), payload.options)
    return { data: axiosResponse.data, status: axiosResponse.status }
  }

  async post (payload:IRequestAdapter.Params):Promise<IRequestAdapter.Result> {
    try {
      const axiosResponse = await axios.post(String(payload.url), payload.body, payload.options)
      return { data: axiosResponse.data, status: axiosResponse.status }
    } catch (err) {
      return { error: err.message, status: 400 }
    }
  }
}
