import { IHttpResponse } from './http'

export interface ICronInterface { 
  handle (): Promise<void>
}
