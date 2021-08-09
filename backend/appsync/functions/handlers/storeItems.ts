import AWS = require('aws-sdk')

import dynamoService = require('../../utils/dynamo')
import s3Service = require('../../utils/s3')

import {
  prepareError, prepareResponse
} from '../../utils/utils'

export interface StoreItem {
  itemId: string
  byLink: string

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
      item.pictures = []

      for (let pic of pictures) {
        if (pic.Key?.includes(_THUMBNAIL)) {
          let url = await s3Service.getSignedUrl(bucket, pic.Key)
          if (!firstThumb) firstThumb = url
          item.pictures.push(url)
        } else console.log(`listItems: ${pic.Key} doesnt include "${_THUMBNAIL}", skip.`)
      }

      if (firstThumb) {
        let temp = firstThumb.split(_THUMBNAIL)
        if (temp.length == 2) {
          item.focusPictureUrl = temp[0]+"."+temp[1]
        } else console.error(`firstThumb: ${firstThumb}, cannot be split into 2 using "${_THUMBNAIL}".`)
      }

      if (!item.focusPictureUrl) item.focusPictureUrl = firstThumb
      return item
    } else return null
  } catch (e) {
    console.error(e)
    return { error: e.toString() }
  }
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
