import AWS = require('aws-sdk')

import dynamoService = require('../../utils/dynamo')
const DynamoParser = AWS.DynamoDB.Converter.unmarshall

export interface OrderInput {
  items: [OrderItemInput]
  email: string

  address: string
  postalCode: string
  city: string
  state: string
  country: string
}

export interface OrderItemInput {
  itemId: string
      
  text: string
  size: string
  color: string
  orientation: string

  additionalInstructions: string
}

export interface OrderOutput {
  orderId: string
  totalPrice: number
  email: string
  orderItems: OrderItemOutput[]
}

export interface OrderItemOutput extends OrderItem {
  purchasePrice: number
}

export interface Order {
  orderId: string
  address: string
  postalCode: string
  city: string
  state: string
  country: string

  orderItems: OrderItem[]
}

export interface OrderItem {
  orderId: string
  orderItemId: string

  itemId: string
  text: string
  size: string
  orientation: string

  additionalInstructions: string
}

export const createOrder = async (event: { arguments: any }): Promise<OrderOutput|{ error: string }> => {
  const { newOrder }: { newOrder: OrderInput } = event.arguments
  const { storeTable, orderTable, orderItemsTable } = process.env

  const result = await dynamoService.putOrder(storeTable, orderTable, orderItemsTable, newOrder)
  if ((result as any).error) { 
    return result as {error: string}
  } else {
    const order = DynamoParser((result as any).order) as OrderOutput
    const orderItems = [] as OrderItemOutput[]
    order.totalPrice = 0

    for (let orderItem of (result as any).orderItems) {
      let oi = DynamoParser(orderItem) as OrderItemOutput
      console.log(`createOrder orderItems :: ${JSON.stringify(oi)}`)
      orderItems.push(oi)

      console.log(`oi.purchasePrice = ${oi.purchasePrice}`)
      order.totalPrice = order.totalPrice + oi.purchasePrice
      console.log(`new totalPrice = ${order.totalPrice}`)
    }
    
    order.orderItems = orderItems
    console.log(`Order: ${JSON.stringify(order)}`)
    return order
  }
}