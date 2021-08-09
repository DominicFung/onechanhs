import AWS = require('aws-sdk')
import { AWSError } from 'aws-sdk'

import dynamoService = require('../../utils/dynamo')

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

export const createOrder = async (event: { arguments: any }): Promise<boolean> => {
  const { newOrder }: { newOrder: OrderInput } = event.arguments
  const { orderTable, orderItemsTable } = process.env

  let result = await dynamoService.putOrder(orderTable, orderItemsTable, newOrder)
  if ((result as unknown as AWSError).code) { 
    console.error(result)
    return false
  }

  console.log(result)
  return true
}