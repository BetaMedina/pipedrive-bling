import { AxiosAdapter } from '../../../../infra/adapters/request/axios-adapter'

export const makeRequestAdapter = () => {
  return new AxiosAdapter()
}
