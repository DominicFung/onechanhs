import AWS = require('aws-sdk')
import Square = require('square')

import dynamoService = require('../../utils/dynamo')
import sesService = require('../../utils/ses')
const DynamoParser = AWS.DynamoDB.Converter.unmarshall

import { isProduction, SQUARE_ACCESS_TOKEN } from '../../env'

export interface OrderInput {
  items: [OrderItemInput]
  email: string

  address: string
  postalCode: string
  city: string
  state: string
  country: string

  shipmentChoice: string
  paymentPlatform: string
  paymentData: string
}

export interface OrderItemInput {
  itemId: string
      
  text: string
  size: string
  color: string
  orientation: string

  additionalInstructions: string
}

export interface OrderOutputStep1 {
  orderId: string
  totalPrice: number
  email: string
  orderItems: OrderItemOutput[]
}

export interface OrderOutputStep2 extends OrderOutputStep1 {
  shipmentChoice: string
  shipmentPrice: number
  paymentPlatform: ShippingOptions
  totalPrice: number
  dateOrdered: number
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

export interface SquareClientInput {
  sourceId: string
  locationId: string
}

const shippingOptions = ["ship-10", "friend"]
export type ShippingOptions = typeof shippingOptions[number]

const shippingCostMap = {
  "Brampton, Ontario":    10,
  "Etobicoke, Ontario":   10,
  "Oakvile, Ontario":     10, // WARNING!!! If you change these values
  "Mississauga, Ontario": 10, //      PLEASE CHANGE FRONTEND
  "Milton, Ontario":      10,
  "Toronto, Ontario":     10,
}
export type ShippingLocations = keyof typeof shippingCostMap

export const createOrder = async (event: { arguments: any }): Promise<OrderOutputStep2|{ error: string }> => {
  const { newOrder }: { newOrder: OrderInput } = event.arguments
  const { storeTable, orderTable, orderItemsTable } = process.env

  if (newOrder.paymentPlatform !== "SQUARE" && newOrder.paymentData) return { error: "unrecognized payment platform." }
  
  const paymentInput = JSON.parse(newOrder.paymentData) as SquareClientInput
  if (newOrder.paymentPlatform == "SQUARE" && (!paymentInput.sourceId || !paymentInput.locationId)) {
    return { error: `wrong configuration for payment type: ${newOrder.paymentPlatform}` }
  }
  
  // Make sure a shipping method is provided, AND it matches what we have on this list
  if ( !Object.keys(shippingCostMap).includes(`${newOrder.city}, ${newOrder.state}`) || 
          !shippingOptions.includes(newOrder.shipmentChoice)) {
    return { error: `unfound location: ${`${newOrder.city}, ${newOrder.state}`}` }
  }

  const result = await dynamoService.putOrder(storeTable, orderTable, orderItemsTable, newOrder)
  if ((result as any).error) { 
    return result as {error: string}
  }

  const order = DynamoParser((result as any).order) as OrderOutputStep1
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

  /**
   * Step 2: work out the payment details
   * This will also add all additional costs 
   *  (promotions can be allowed in the future as negative number)
  */
  if (newOrder.shipmentChoice == "ship-10") {
    order.totalPrice = order.totalPrice + shippingCostMap[`${newOrder.city}, ${newOrder.state}`]
  }

  // Add TAX here if needed
  // Add DISCOUNTS here if needed

  const bodyAmountMoney : Square.Money = {}
  bodyAmountMoney.amount = BigInt(order.totalPrice)
  bodyAmountMoney.currency = "CAN"

  const squarePaymentRequest: Square.CreatePaymentRequest = {
    sourceId: paymentInput.sourceId,
    idempotencyKey: order.orderId,
    amountMoney: bodyAmountMoney
  }

  try {
    const client = new Square.Client({
      environment: isProduction ? Square.Environment.Production : Square.Environment.Sandbox,
      accessToken: SQUARE_ACCESS_TOKEN,
    });

    const { result, ...httpResponse } = await client.paymentsApi.createPayment(squarePaymentRequest)
    const { statusCode, headers } = httpResponse
    console.log(`SQUARE OK - ${statusCode} ${JSON.stringify(headers)}`)

    const result2 = await dynamoService.writePayment(
        order, orderTable, newOrder.shipmentChoice, 
        shippingCostMap[`${newOrder.city}, ${newOrder.state}`], 
        newOrder.paymentPlatform, result, order.totalPrice)

    if ((result2 as any).error) {
      console.error(`writePayment error: ${JSON.stringify(result2)}`)
      return result2 as { error: string }
    }

    // Step 3: send the email
    const emailResult = await sesService.sendOrderEmail([], order)
    console.log("Email sent!")
    console.log(emailResult)

    return (result2 as { order: OrderOutputStep2 }).order
  } catch (error) {
    if (error instanceof Square.ApiError) {
      const { statusCode, headers } = error
      console.error(`Square Error statusCode: ${ statusCode }, ${JSON.stringify(headers)}`)
      console.error(error.message)
      return { error: error.message }
    } else {
      console.error(JSON.stringify(error))
      return { error: JSON.stringify(error) }
    }
  }
}