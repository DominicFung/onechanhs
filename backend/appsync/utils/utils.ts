
const responseJsonSchema = {
  isBase64Encoded: false,
  statusCode: 200,
  body: "{}" as string,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
}

export const prepareResponse = (data: any, status = 200) => {
  const response = { ...responseJsonSchema }
  response.body = JSON.stringify(data)
  response.statusCode = status
  return response
}

export const prepareError = (error: any, status = 500) => {
  const response = { ...responseJsonSchema }
  response.body = JSON.stringify({ error: error.toString() })
  response.statusCode = status
  console.error({ response: response.body })
  return response
}