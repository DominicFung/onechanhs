import AWS = require('aws-sdk')
import { OrderOutputStep1 } from '../functions/handlers/orders'
import { SendEmailRequest } from 'aws-sdk/clients/sesv2'

export const sendOrderEmail = async (to: string[], order: OrderOutputStep1, from: string = "\"Lois\" <info@onechanhs.ca>", cc: string[] = ["info@onechanhs.ca"], region: string = "us-west-2") => {
  const SES = new AWS.SESV2({ region })

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SESV2.html#sendEmail-property
  let params = {
    Content: {
      Simple: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
              <h2>New One Chanhs Order!</h2>
              <p><b>Order ID: </b> ${order.orderId}</p>
              <p><b>Email: </b> ${order.email}</p>
              <br />
              <p>${JSON.stringify(order)}</p>`
          }
        },
        Subject: { Data: `OneChanhs Order Id: ${order.orderId}` }
      }
    },
    Destination: {
      ToAddresses: to,
      CcAddresses: cc
    },
    FromEmailAddress: from
  } as SendEmailRequest

  return await SES.sendEmail(params).promise()
}