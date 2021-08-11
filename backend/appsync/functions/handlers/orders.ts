import AWS = require('aws-sdk')

import dynamoService = require('../../utils/dynamo')
const DynamoParser = AWS.DynamoDB.Converter.unmarshall

export interface OrderInput {
  items: [OrderItemInput]
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

export const createOrder = async (event: { arguments: any }): Promise<Order|{ error: string }> => {
  const { newOrder }: { newOrder: OrderInput } = event.arguments
  const { orderTable, orderItemsTable } = process.env

  const result = await dynamoService.putOrder(orderTable, orderItemsTable, newOrder)
  if ((result as any).error) { 
    return result as {error: string}
  } else {
    const order = DynamoParser(result as any)
    console.log(`Order: ${JSON.stringify(order)}`)
    return order as unknown as Order
  }
}