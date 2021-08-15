import AWS = require('aws-sdk')
import { AWSError } from 'aws-sdk'
import { PromiseResult } from 'aws-sdk/lib/request'
import { v4 } from 'uuid'

import { QueryOutput, PutItemOutput } from 'aws-sdk/clients/dynamodb'
import { Order, OrderInput, OrderItem, OrderItemInput } from '../functions/handlers/orders'
import { StoreItem, StoreItemInput } from '../functions/handlers/storeItems'

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

export interface ItemPriceMap {
  [itemId: string]: number
}

export const checkStorePrices = async (
  storeTable: string = "storeItem",
  ordItemInputList: OrderItemInput[]
): Promise<ItemPriceMap|null> => {
  const priceMap: ItemPriceMap = {}
  
  for (let oii of ordItemInputList) {
    if (!priceMap[oii.itemId]) {
      const { Items } = await queryStoreItemById(storeTable, oii.itemId)
      if (Items && Items.length == 1){
        let item = DynamoParser(Items[0]) as StoreItem
        priceMap[oii.itemId] = item.price
      } else {
        console.error(`checkStorePrices: ItemId not found! ${oii.itemId}. returning null.`)
        console.error(`checkStorePrices: Maybe the item was deleted before the user could buy?`)
        return null
      }
    } else {
      console.log(`checkStorePrices: map already includes ItemId ${oii.itemId}, continue ..`)
    }
  }
  
  return priceMap
}

export const putOrder = async (
  storeTable: string = "storeItem",
  orderTable: string = "order", 
  orderItemsTable: string = "orderItem", 
  payload: OrderInput
): Promise<{
  order: any, orderItems: any[] // These are in dynamoDB format
}|{ error: string }> => {
  const priceMap = await checkStorePrices(storeTable, payload.items)
  if (priceMap) {
    const dynamodb = new AWS.DynamoDB({region: REGION })
    const orderId = v4()

    if (!payload.email) return { error: `email is empty!` }

    let order = {
      'orderId':     { S: orderId },
      'email':       { S: payload.email }
    }

    if ( payload.address )    order['address']    = { S: payload.address }
    if ( payload.postalCode ) order['postalCode'] = { S: payload.postalCode }
    if ( payload.city )       order['city']       = { S: payload.city }
    if ( payload.state )      order['state']      = { S: payload.state }
    if ( payload.country )    order['country']    = { S: payload.country }

    const tempOrders = order
    const params = {
      TableName: orderTable, Item: order
    }

    let promises: Promise<PromiseResult<PutItemOutput, AWSError>>[] = []
    const tempOrderItems: any[] = []
    order['orderItems'] = { L: [] }

    for (let oi of payload.items) {
      if (!oi.itemId) return { error: `orderItem is missing an itemId reference` }
      let orderItem = {
        'orderId':       { S: orderId },
        'orderItemId':   { S: v4() },
        'purchasePrice': { N: priceMap[oi.itemId].toFixed(2) },
        'itemId':        { S: oi.itemId }
      }

      if ( oi.text )        orderItem['text']         = { S: oi.text }
      if ( oi.color )       orderItem['size']         = { S: oi.color }
      if ( oi.orientation ) orderItem['orientation']  = { S: oi.orientation }
      
      if (oi.additionalInstructions) orderItem['additionalInstructions'] = { S: oi.additionalInstructions }

      const orderItemParams = {
        TableName: orderItemsTable,
        Item: orderItem
      }

      tempOrderItems.push(orderItem)
      promises.push(dynamodb.putItem(orderItemParams).promise())
    }

    let orderItemsResult = await Promise.all(promises)
    console.log("order results: ")
    console.log(JSON.stringify(orderItemsResult))

    console.log("temp order items:")
    console.log(tempOrderItems)

    for (let i=0; i<orderItemsResult.length; i++) {
      if (!(orderItemsResult[i][1])) {
        // This is not an error. Push to Orders for return.
        order['orderItems'].L.push(tempOrderItems[i].orderItemId )
      }
    }

    console.log("params for putItme :: order table")
    console.log(JSON.stringify(params))
    const result = await dynamodb.putItem(params).promise()
    if ((result as unknown as AWSError).code) {
      console.error(result)
      return { error: (result as unknown as AWSError).message }
    } else {
      console.log(`putOrder: Returning full obj.`)
      console.log(tempOrderItems)
      console.log(tempOrderItems)
      return { order: tempOrders, orderItems: tempOrderItems }
    }
  } else {
    console.error(`putOrder: Some itemIds in OrderItems does not exist in out DB.`)
    return { error: 'Some itemIds in OrderItems does not exist in out DB. Were those orders deleted?' }
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