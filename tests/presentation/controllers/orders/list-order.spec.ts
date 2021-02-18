import { emptyResponse, serverError, successResponse } from '../../../../src/presentation/helpers/http/http-helper'
import { GetOrderController } from '../../../../src/presentation/controllers/orders/get-order'
import { ListOrderStub } from '../../mocks/list-order'

const makeSut = () => {
  const listOrderSut = new ListOrderStub()
  const sut = new GetOrderController(listOrderSut)
  return {
    listOrderSut,
    sut
  }
}
describe('List Order Controller', () => {
  it('Should return 204 when not finding records', async () => {
    const { listOrderSut, sut } = makeSut()

    jest.spyOn(listOrderSut, 'list').mockResolvedValueOnce([])
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual(emptyResponse())
  })
  it('Should return 500 when list throws', async () => {
    const { listOrderSut, sut } = makeSut()

    jest.spyOn(listOrderSut, 'list').mockRejectedValueOnce(() => { throw new Error('any_error') })
    const httpResponse = await sut.handle()

    expect(httpResponse).toEqual(serverError(new Error('any_error')))
  })
  it('Should return success', async () => {
    const { listOrderSut, sut } = makeSut()

    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(successResponse([{
      id: listOrderSut.id,
      name: listOrderSut.name,
      clientName: listOrderSut.clientName,
      date: listOrderSut.date,
      value: listOrderSut.value,
      currency: listOrderSut.currency
    }]))
  })
})
