import AWS = require('aws-sdk')
import { OrderOutputStep2 } from '../functions/handlers/orders'
import { SendEmailRequest } from 'aws-sdk/clients/sesv2'

function stringify(obj: any): string {
  return JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint'
          ? value.toString()
          : value // return everything else unchanged
  )
}

function toHTML(order: OrderOutputStep2): string {
  let html: string = "<div>"

  for (let key of Object.keys(order)) {
    html = html.concat(`<span><b>${key}:</b> ${stringify(order[key])}</span><br />`)
  }

  html = html.concat("</div>")
  return html
}

export const sendOrderEmail = async (to: string[], order: OrderOutputStep2, from: string = "\"Lois\" <info@onechanhs.ca>", cc: string[] = ["info@onechanhs.ca"], region: string = "us-west-2") => {
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
              <p>${toHTML(order)}</p>`
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