import AWS = require('aws-sdk')
import { AWSError } from 'aws-sdk'
import { PromiseResult } from 'aws-sdk/lib/request'
import { v4 } from 'uuid'

import { QueryOutput, PutItemOutput } from 'aws-sdk/clients/dynamodb'
import { OrderInput } from '../functions/handlers/orders'
import { StoreItemInput } from '../functions/handlers/storeItems'

const REGION = 'ca-central-1'
const DynamoParser = AWS.DynamoDB.Converter.unmarshall

function getClients(regions = 'ca-central-1') {
  if (!regions) {
      return [new AWS.DynamoDB()]
  }
  const regionsArray = regions.split(',')
  const clients = regionsArray.map(region => new AWS.DynamoDB({ region }))
  return clients;
}

export const queryStoreItemById = async (table: string = "storeItem", id: string): Promise<QueryOutput> => {
  const dynamodb = new AWS.DynamoDB({region: REGION })
  console.log(`dynamodb: queryStoreItemById`)

  const params = {
    TableName: table,
    ExpressionAttributeValues: { ':itemId': { S: id } },
    KeyConditionExpression: 'itemId = :itemId',
    Select: 'ALL_ATTRIBUTES'
  }

  console.log(JSON.stringify(params))
  const result = dynamodb.query(params).promise()
  return result
}

export const putOrder = async (
  orderTable: string = "order", 
  orderItemsTable: string = "orderItem", 
  payload: OrderInput
) => {
  const dynamodb = new AWS.DynamoDB({region: REGION })
  const orderId = v4()

  let order = {
    'orderId':     { S: orderId },
    'address':     { S: payload.address },
    'postalCode':  { S: payload.postalCode },
    'city':        { S: payload.city },
    'state':       { S: payload.state },
    'country':     { S: payload.country }
  }

  const params = {
    TableName: orderTable, Item: order
  }

  let promises: Promise<PromiseResult<PutItemOutput, AWSError>>[] = []
  let tempOrderItems: any[] = []
  order['orderItems'] = { L: [] }

  for (let oi of payload.items) {
    let orderItem = {
      'orderId':      { S: orderId },
      'orderItemId':  { S: v4() },
      
      'itemId':       { S: oi.itemId },
      'text':         { S: oi.text },
      'size':         { S: oi.color },
      'orientation':  { S: oi.orientation },

      'additionalInstructions': { S: oi.additionalInstructions }
    }

    const orderItemParams = {
      TableName: orderItemsTable,
      Item: orderItem
    }

    tempOrderItems.push(orderItem)
    promises.push(dynamodb.putItem(orderItemParams).promise())
  }

  let orderItemsResult = await Promise.all(promises)
  console.log(JSON.stringify(orderItemsResult))

  for (let i=0; i<orderItemsResult.length; i++) {
    if (!(orderItemsResult[i][1])) {
      // This is not an error. Push to Orders for return.
      order['orderItems'].L.push(tempOrderItems[i])
    }
  }

  console.log(JSON.stringify(params))
  const result = await dynamodb.putItem(params).promise()
  if ((result as unknown as AWSError).code) {
    console.error(result)
    return { error: (result as unknown as AWSError).message }
  } else {
    console.log(`putOrder: Returning full obj.`)
    return order
  }
}

export const scanforAllItems = (table: string = "storeItem", limit: number = 20, startKey?: string) => {
  const dynamodb = new AWS.DynamoDB({region: REGION})

  let params = {
    TableName: table,
    Limit: limit
  } as any

  if (startKey)
    params.ExclusiveStartKey = startKey

  const result = dynamodb.scan(params).promise()
  return result
}

export const putItem = async (table: string = "storeItem", payload: StoreItemInput) => {
  const dynamodb = new AWS.DynamoDB({region: REGION })
  const storeItemId =  v4()
  const linkId = payload.title.toLowerCase().split(" ").join("-")
  const storeItem = {
    'itemId':            { S: storeItemId },
    'linkId':            { S: linkId },

    'title':             { S: payload.title },
    'description':       { S: payload.description },
    'price':             { N:  payload.price.toFixed(2)},
    'currency':          { S: 'CAN' },

    'hashtags':          { L: [] },
    'shortDescription':  { S: "" },

    'customizeTextInstructions': { S: "" },
    'sizes':            { L: [] },
    'colors':           { L: [] },
    'orientations':     { L: [] },

    'isPublished':      { BOOL: false }
  }


  const params = {
    TableName: table,
    Item: storeItem
  }

  const result = await dynamodb.putItem(params).promise()
  if ((result as unknown as AWSError).code) {
    console.error(result)
    return { error: (result as unknown as AWSError).message }
  } else {
    console.log(`createItem: Returning full obj.`)
    return storeItem
  }
}