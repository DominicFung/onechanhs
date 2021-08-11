import AWS = require('aws-sdk')
import { AWSError } from 'aws-sdk'

import dynamoService = require('../../utils/dynamo')
import s3Service = require('../../utils/s3')

import {
  prepareError, prepareResponse
} from '../../utils/utils'

export interface StoreItemInput {
  title: string
  description: string
  price: number
}

export interface StoreItem {
  itemId: string
  linkId: string

  title: string
  description?: string

  focusPictureUrl?: string
  pictures?: string[]

  price: number
  currency: string
  discountPrice?: number
}


const DynamoParser = AWS.DynamoDB.Converter.unmarshall
const _DefaultBucket = 'onechanhs-images'
const _THUMBNAIL = "_thumbnail."

export const listItems = async (event: { arguments: any }): Promise<any> => {
  console.log(`listItems event ${JSON.stringify(event)}`)

  const { table, bucket = _DefaultBucket } = process.env
  const { limit, nextToken } = event.arguments

  try {
    const { Items, LastEvaluatedKey } = await dynamoService.scanforAllItems(table, limit, nextToken)
    console.log(JSON.stringify(Items))

    let itemList = [] as StoreItem[]
    if (Items) {
      for (let row of Items) {
        let item = DynamoParser(row) as StoreItem
        if (!item.pictures) item.pictures = []
        
        let pictures = await s3Service.list(bucket, `public/${item.itemId}/`) || []

        for (let pic of pictures) {
          if (pic.Key?.includes(_THUMBNAIL)) {
            let url = await s3Service.getSignedUrl(bucket, pic.Key)
            item.pictures.push(url)
          } else console.log(`listItems: ${pic.Key} doesnt include "${_THUMBNAIL}", skip.`)
        }

        itemList.push(item)
      }

      console.log(itemList)
      return { storeItems: itemList, nextToken: LastEvaluatedKey }
    } else console.warn(`Item may be null.`)
  } catch (e) {
    console.error(e)
    return { error: e.toString() }
  }
}


export const getStoreItemWithPic = async (event: { arguments: any }): Promise<any> => {
  console.log(`getStoreItemWithPic event: ${JSON.stringify(event)}`)
  
  try {
    const { bucket = _DefaultBucket, table } = process.env
    const { itemId } = event.arguments

    console.log(`table: ${table}, itemId: ${itemId}`)

    const { Items } = await dynamoService.queryStoreItemById(table, itemId)
    console.log(`getStoreItemWithPic Items: ${JSON.stringify(Items)}`)

    if (Items && Items.length == 1){
      let item = DynamoParser(Items[0])

      let pictures = await s3Service.list(bucket, `public/${item.itemId}/`) || []
      let firstThumb = null as string|null
      
      item.picKeys = []
      item.pictures = []

      for (let pic of pictures) {
        if (pic.Key?.includes(_THUMBNAIL)) {
          let url = await s3Service.getSignedUrl(bucket, pic.Key)
          if (!firstThumb) firstThumb = pic.Key.split(_THUMBNAIL).join(".")
          item.pictures.push(url)
          item.picKeys.push(pic.Key.split(_THUMBNAIL).join("."))
        } else console.log(`listItems: ${pic.Key} doesnt include "${_THUMBNAIL}", skip.`)
      }

      if (firstThumb) {
        item.focusPictureUrl = await s3Service.getSignedUrl(bucket, firstThumb)
      } else console.error(`firstThumb: ${firstThumb} doesnt exist!`)

      return item
    } else return null
  } catch (e) {
    console.error(e)
    return { error: e.toString() }
  }
}

export const getHDImage = async (event: { arguments: any }): Promise<any> => {
  const { bucket = _DefaultBucket } = process.env
  const { key } = event.arguments

  const url = await s3Service.getSignedUrl(bucket, key)
  return { url }
}

export const getStoreItemWithThumb = async (event: { arguments: any }): Promise<any> => {
  // Lets now try to do this WIHTOUT reading "pictures" from the DB
  // This will leave us with less ambiguity. Can we control the ordering VIA filename?

  console.log(`getStoreItemWithPic event: ${JSON.stringify(event)}`)
  
  try {
    const { bucket = _DefaultBucket, table } = process.env
    const { itemId } = event.arguments

    console.log(`table: ${table}, itemId: ${itemId}`)

    const { Items } = await dynamoService.queryStoreItemById(table, itemId)
    console.log(`getStoreItemWithPic Items: ${JSON.stringify(Items)}`)

    if (Items && Items.length == 1){
      let item = DynamoParser(Items[0])
      let pictures = await s3Service.list(bucket, `public/${item.itemId}/`) || []
      item.pictures = []

      for (let pic of pictures) {
        if (pic.Key?.includes(_THUMBNAIL)) {
          let url = await s3Service.getSignedUrl(bucket, pic.Key)
          item.pictures.push(url)
        } else console.log(`listItems: ${pic.Key} doesnt include "${_THUMBNAIL}", skip.`)
      }

      return item
    } else return null
  } catch (e) {
    console.error(e)
    return { error: e.toString() }
  }
}

export const createItemFull = async (event: { arguments: any }): Promise<StoreItem|{error: string}> => {
  const { table } = process.env
  const { newItem }: { newItem: StoreItemInput } = event.arguments
  const result = await dynamoService.putItem(table, newItem)

  if ((result as { error: string }).error) { 
    console.error(result)
    return result as {error: string}
  } else {
    const storeItem = DynamoParser(result as any)
    console.log(`StoreItem: ${JSON.stringify(storeItem)}`)
    return storeItem as unknown as StoreItem
  }
}