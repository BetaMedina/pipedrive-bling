import { IListOrderRepository } from 'src/data/contracts/order/list-order'
import { IListOrder } from 'src/domain/contracts/order/list-order'
import { ICreateOrderRepository } from '../../../../data/contracts/order/create-order'
import { MongoHelper } from '../helper/mongo.helper'

export class OrderRepository implements ICreateOrderRepository, IListOrderRepository {
  async create (order:ICreateOrderRepository.Params): Promise<ICreateOrderRepository.Result> {
    const collection = await MongoHelper.getCollection('orders')
    const insertResponse = await collection.insertOne({ ...order, date: new Date() })
    return MongoHelper.map(insertResponse)
  }

  async list (): Promise<IListOrderRepository.Result> {
    const collection = await MongoHelper.getCollection('orders')
    const result = []
    await collection.find({}).forEach((item) => {
      const { _id, ...order } = item
      result.push({ id: _id, ...order })
    })
    return result
  }
}
