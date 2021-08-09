import AWS = require('aws-sdk')
import { GetObjectOutput } from 'aws-sdk/clients/s3'

import Jimp = require('jimp')

const s3 = new AWS.S3()
const _THUMBNAIL = "_thumbnail."
export const waitForObject = (bucket: string, key: string) => {
    const params = {
        Bucket: bucket,
        Key: key
    };
    return s3.waitFor('objectExists', params).promise();
}

export const list = async (bucket: string, prefix: string) => {
  const params = {
      Bucket: bucket,
      Prefix: prefix
  };
  const result = await s3.listObjects(params).promise();
  
  console.log('S3.list', JSON.stringify(result));
  
  return result.Contents;
}

export const getSignedUrl = async (bucket: string, key: string) => {
  const s3 = new AWS.S3({
      signatureVersion: 'v4',
      accessKeyId: process.env.access_key,
      secretAccessKey: process.env.secret_access_key
  });
  const params = { Bucket: bucket, Key: key, Expires: parseInt(process.env.signed_url_expires || "86400") };
  console.log('S3.getSignedUrlPromise params', params);
  const url = await s3.getSignedUrlPromise('getObject', params);
  console.log('S3.getSignedUrlPromise', url);
  return url;
}

export const resizeImage = async (
  bucket: string, file: string, width: number,
) => {
  const s3 = new AWS.S3({
    signatureVersion: 'v4',
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_access_key
  });

  console.log(JSON.stringify({
    signatureVersion: 'v4',
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_access_key
  }))
  const imageBuffer: GetObjectOutput = await s3.getObject({Bucket: bucket, Key: file}).promise()
  if (imageBuffer && imageBuffer.Body) {
    console.log('Inside imageBuffer')
    console.log(imageBuffer.Body)
    console.log(Jimp)
    
    const jimpImage = await Jimp.read(imageBuffer.Body as Buffer)
    const mime = jimpImage.getMIME()
    console.log(`mime: ${mime}`)

    const ratio = width / jimpImage.getWidth()
    const resizedImageBuffer = await jimpImage.scale(ratio).getBufferAsync(mime)

    const thumbFileTemp = file.split(".")
    if (thumbFileTemp.length >= 2) {
      const tempBeginning = thumbFileTemp.slice(0, -2).join(".") || ""
      const tempEnding = thumbFileTemp[thumbFileTemp.length-2]+_THUMBNAIL+thumbFileTemp[thumbFileTemp.length-1]

      const fileName = tempBeginning+"."+tempEnding
      console.log(`resizeImage: thumbnail file name: ${fileName}`)

      const writeParam = {
        Bucket: bucket,
        Body: resizedImageBuffer,
        Key: fileName,
        // ACL: 'public-read',
        ContentType: mime
      }

      const result = s3.putObject(writeParam).promise()
      return result
    } else { console.error(`resizeImage: "${file}" does not contain a period "."`) }
  } else { console.error(`S3 GetObject: imageBuffer is null.`) }
}