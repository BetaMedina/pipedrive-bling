import { badRequest, serverError, successResponse } from '../../../../src/presentation/helpers/http/http-helper'
import { BlingCreateOrder } from '../../../../src/data/use-cases/bling/create-order'
import { XmlValidatorStub } from '../../mocks/convert-xml'
import { RequestStub } from '../../mocks/request'
import { config } from 'dotenv'
import faker from 'faker'

config()
const makeSut = () => {
  const xmlSut = new XmlValidatorStub()
  const requestSut = new RequestStub()
  const sut = new BlingCreateOrder(requestSut, xmlSut)
  return {
    xmlSut,
    requestSut,
    sut
  }
}
let makePayload
describe('Bling Use Case', () => {
  beforeEach(() => {
    makePayload = {
      id: faker.random.number(99),
      person_name: faker.name.firstName(),
      title: faker.random.word(),
      value: faker.commerce.price(10, 99),
      update_time: faker.date.recent(),
      currency: faker.finance.currencyCode()
    }
  })
  it('Should expected to call convertToXml with correct parameters', async () => {
    const { sut, xmlSut } = makeSut()
    const spy = jest.spyOn(xmlSut, 'convertToXml')

    await sut.createOrder(makePayload)

    expect(spy).toBeCalledWith({
      pedido: {
        cliente: {
          nome: makePayload.clientName
        },
        itens: {
          item: {
            codigo: makePayload.code,
            descricao: makePayload.description,
            vlr_unit: makePayload.value,
            qtde: '1'
          }
        }
      }
    })
  })
  it('Should expected request with correct parameters', async () => {
    const { sut, requestSut, xmlSut } = makeSut()
    const spy = jest.spyOn(requestSut, 'post')

    await sut.createOrder(makePayload)

    expect(spy).toBeCalledWith({
      url: process.env.BLING_URL,
      options: {
        params: {
          apikey: process.env.BLING_API_KEY,
          xml: xmlSut.result
        }
      }
    })
  })
  it('Should return 400 badRequest when response !== 200', async () => {
    const { sut, requestSut } = makeSut()
    jest.spyOn(requestSut, 'post').mockResolvedValueOnce({
      status: 400,
      error: 'valid-error'
    })

    const response = await sut.createOrder(makePayload)

    expect(response).toEqual({
      status: 400,
      error: 'valid-error'
    })
  })
  it('Should expected return success', async () => {
    const { sut } = makeSut()

    const response = await sut.createOrder(makePayload)

    expect(response).toEqual({
      status: 201
    })
  })
})
