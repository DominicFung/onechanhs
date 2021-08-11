import s3Service = require('../../utils/s3')

import Jimp = require('jimp')
import heicConverter = require('heic-convert')

const _DefaultBucket = 'onechanhs-images'
const _THUMBNAIL = "_thumbnail."
const _acceptedMimes = ["jpeg", "jpg"]

export const imageResize = async (event: { Records: any }): Promise<any> => {
  console.log(`imageResize event: ${JSON.stringify(event)}`)
  const { bucket = _DefaultBucket } = process.env
  const { Records } = event

  console.log(JSON.stringify(Records))

  try {
    const promArray = Records.map((record: any) => {
      const b = record.s3.bucket.name || bucket
      const f = record.s3.object.key as string

      if (!f.includes(_THUMBNAIL)) {
        console.log(`record.s3.bucket.name: ${b}, record.s3.object.key: ${f} ${!f.includes(_THUMBNAIL)}`)

        const fextension = f.toLowerCase().split(".").pop()
        console.log(`extension: .${fextension}`)
        if (fextension == "heic") {
          console.log('file extension is .heic, converting and deleting ..')
          return s3Service.convHeicToJpegAndSave(b, f)
        } else {
          for (let extension of _acceptedMimes) {
            if (fextension == extension) {
              console.log(`file ends with .${extension}`)
              return s3Service.resizeImage(b, f, 300)
            }
          }
  
          console.error(`unsupported extension: .${f.split('.')[-1]}`)
          return { error: `unsupported extension: .${f.split('.')[-1]}` }
        }
      } else return true
    })
    
    return Promise.all(promArray)
  } catch (e) {
    console.error(e)
    return { error: e.toString() }
  }
}

export const test = async (event: { Records: any }) => {
  console.log("in image.test")
  let imageBuffer = await Jimp.read("https://source.unsplash.com/random")
  console.log(imageBuffer.getMIME())
  return
}

export const convertHeic = async (inputBuffer: Buffer): Promise<Buffer> => {
  console.log(`convertHeic(): ... `)
  console.log(heicConverter)
  return await heicConverter({ buffer: inputBuffer, format: 'JPEG', quality: 1})
}