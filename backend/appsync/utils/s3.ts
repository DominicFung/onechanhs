import AWS = require('aws-sdk');
//import  fs = require("fs");

const s3 = new AWS.S3();

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