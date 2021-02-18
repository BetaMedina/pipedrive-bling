import { BlingCreateOrder } from '../../../../data/use-cases/bling/create-order'
import { makeXmlAdapter } from '../../infra/adapters/xml-adapter'
import { makeRequestAdapter } from '../../infra/adapters/request-adapter'

export const makeBlingCreateOrder = () => {
  return new BlingCreateOrder(makeRequestAdapter(), makeXmlAdapter())
}
