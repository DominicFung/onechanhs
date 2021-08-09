import s3Service = require("../../utils/s3")
import Jimp = require('jimp')

const _DefaultBucket = 'onechanhs-images'
const _THUMBNAIL = "_thumbnail."

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
        return s3Service.resizeImage(b, f, 300)
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