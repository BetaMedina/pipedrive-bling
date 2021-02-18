import { IRequestAdapter } from 'src/data/contracts/adapters/request/request-adapter'
import { IXmlAdapter } from 'src/data/contracts/adapters/xml/xml-adapter'
import { IBlingCreateOrder } from '../../../domain/contracts'

export class BlingCreateOrder implements IBlingCreateOrder {
  private blingUrl: String
  constructor (private readonly request: IRequestAdapter, private readonly xml: IXmlAdapter) {
    this.blingUrl = process.env.BLING_URL
  }

  async createOrder (payload: IBlingCreateOrder.Params): Promise<IBlingCreateOrder.Result> {
    const payloadXml = await this.xml.convertToXml({
      pedido: {
        cliente: {
          nome: payload.clientName
        },
        itens: {
          item: {
            codigo: payload.code,
            descricao: payload.description,
            vlr_unit: payload.value,
            qtde: '1'
          }
        }
      }
    })
    const httpResponse = await this.request.post({
      url: process.env.BLING_URL,
      options: {
        params: {
          apikey: process.env.BLING_API_KEY,
          xml: payloadXml
        }
      }
    })
    if (httpResponse.status !== 201) {
      return { status: 400, error: httpResponse.error }
    }
    return { status: 201 }
  }
}
