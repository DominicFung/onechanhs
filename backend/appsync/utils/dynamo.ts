import AWS = require('aws-sdk')
import { v4 } from 'uuid'

import { QueryOutput } from 'aws-sdk/clients/dynamodb'
import { OrderInput } from '../functions/handlers/orders'
import { StoreItemInput } from '../functions/handlers/storeItems'

const REGION = 'ca-central-1'

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

  const params = {
    TableName: orderTable,
    Item: {
      'orderId':     { S: orderId },
      'address':     { S: payload.address },
      'postalCode':  { S: payload.postalCode },
      'city':        { S: payload.city },
      'state':       { S: payload.state },
      'country':     { S: payload.country }
    }
  }

  let promises: Promise<any>[] = []
  for (let orderItem of payload.items) {

    const orderItemParams = {
      TableName: orderItemsTable,
      Item: {
        'orderId':      { S: orderId },
        'orderItemId':  { S: v4() },
        
        'itemId':       { S: orderItem.itemId },
        'text':         { S: orderItem.text },
        'size':         { S: orderItem.color },
        'orientation':  { S: orderItem.orientation },

        'additionalInstructions': { S: orderItem.additionalInstructions }
      }
    }

    promises.push(dynamodb.putItem(orderItemParams).promise())
  }

  let orderItemsResult = await Promise.all(promises)
  console.log(JSON.stringify(orderItemsResult))

  console.log(JSON.stringify(params))
  const result = dynamodb.putItem(params).promise()
  return result
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

export const createItem = (table: string = "storeItem", payload: StoreItemInput) => {
  const dynamodb = new AWS.DynamoDB({region: REGION })
  const storeItemId =  v4()
  const linkId = payload.title.toLowerCase().split(" ").join("-")

  const params = {
    TableName: table,
    Item: {
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
  }

  const results = dynamodb.putItem(params).promise()
  return results
}