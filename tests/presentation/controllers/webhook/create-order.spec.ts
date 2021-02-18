import { WebhookController } from '../../../../src/presentation/controllers/webhook-pipedrive/create-order'
import { badRequest, serverError, successResponse } from '../../../../src/presentation/helpers/http/http-helper'
import { BlingCreateOrderStub } from '../../mocks/bling-create-order'
import { CreateOrderStub } from '../../mocks/create-order'
import faker from 'faker'

const makeSut = () => {
  const blingSut = new BlingCreateOrderStub()
  const createOrderSut = new CreateOrderStub()
  const sut = new WebhookController(blingSut, createOrderSut)
  return {
    blingSut,
    createOrderSut,
    sut
  }
}
let makePayload
describe('Webhook Controller', () => {
  beforeEach(() => {
    makePayload = {
      body: {
        current: {
          id: faker.random.number(99),
          person_name: faker.name.firstName(),
          title: faker.random.word(),
          value: faker.commerce.price(10, 99),
          update_time: faker.date.recent(),
          currency: faker.finance.currencyCode()
        }
      }
    }
  })
  it('Should expected to call bling with correct parameters', async () => {
    const { sut, blingSut } = makeSut()
    const spy = jest.spyOn(blingSut, 'createOrder')
    await sut.handle(makePayload)

    expect(spy).toBeCalledWith({
      clientName: makePayload.body.current.person_name,
      code: makePayload.body.current.id,
      description: makePayload.body.current.title,
      value: makePayload.body.current.value
    })
  })
  it('Should expected return server error when bling throws', async () => {
    const { sut, blingSut } = makeSut()
    jest.spyOn(blingSut, 'createOrder').mockImplementationOnce(() => { throw new Error('valid_error') })
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(serverError(new Error('valid_error')))
  })
  it('Should expected return badRequest when bling return httpResponse !== 200', async () => {
    const { sut, blingSut } = makeSut()
    jest.spyOn(blingSut, 'createOrder').mockResolvedValueOnce({ error: 'valid_error', status: 400 })
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(badRequest({ bling: 'valid_error' }))
  })
  it('Should expected return badRequest when bling return httpResponse !== 200', async () => {
    const { sut, blingSut } = makeSut()
    jest.spyOn(blingSut, 'createOrder').mockResolvedValueOnce({ error: '', status: 400 })
    
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(badRequest({ bling: 'Order cannot be entered into the bling' }))
  })
  it('Should expected to call createOrder with correct parameters', async () => {
    const { sut, createOrderSut } = makeSut()
    const spy = jest.spyOn(createOrderSut, 'create')

    await sut.handle(makePayload)

    expect(spy).toBeCalledWith({
      name: makePayload.body.current.title,
      clientName: makePayload.body.current.person_name,
      date: makePayload.body.current.update_time,
      value: makePayload.body.current.value,
      currency: makePayload.body.current.currency
    })
  })
  it('Should expected return server error when createOrder throws', async () => {
    const { sut, createOrderSut } = makeSut()
    jest.spyOn(createOrderSut, 'create').mockImplementationOnce(() => { throw new Error('valid_error') })
    const httpResponse = await sut.handle(makePayload)

    expect(httpResponse).toEqual(serverError(new Error('valid_error')))
  })
  it('Should expected return 200', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makePayload)
    expect(httpResponse).toEqual(successResponse({ success: 'Order has been register' }))
  })
})
