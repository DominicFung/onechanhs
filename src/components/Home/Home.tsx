

import React, { useEffect } from 'react'
import polaroid from '../../assets/polaroid.png'

//const defaultBackground = './assets/mainPhoto.jpg'
//const defaultBackground = './assets/IMG_1598.jpg'
//const defaultBackground = './assets/IMG_1598_jpg.jpg'
const defaultBackground = './assets/IMG_1598_jpg_2.jpg'
const locationImage = './assets/locationImage1.jpg'

const polaroidPic1 = './assets/DSC_0077.jpg'
const polaroidPic2 = './assets/DSC_0076.jpg'

// Note: actual = 441/539
const polaroidInnerHxW = 500/430

export default function Home () {

  const [polaroidSizeH, setPolaroidSizeH] = React.useState(500)
  const [polaroidSizeW, setPolaroidSizeW] = React.useState(500)

  const [useLongHeight, setUseLongHeight] = React.useState(false)

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions, true)
    return window.removeEventListener('resize', updateDimensions)
  }, [])

  const updateDimensions = () => {
    let width = window.innerWidth
    const _maxWidth = 1000

    console.log(window.innerHeight)
    if (width <= _maxWidth) { 
      setPolaroidSizeW((width-150)/2)
      setPolaroidSizeH((width-150)/2 * polaroidInnerHxW)
    } else {
      setPolaroidSizeW((_maxWidth-150)/2)
      setPolaroidSizeH((_maxWidth-150)/2 * polaroidInnerHxW)
    }

    const _LONGHEIGHTCUTTOFF = 831
    //const _LONGHEIGHTCUTTOFF = 2000
    if (window.innerHeight <= _LONGHEIGHTCUTTOFF) {
      setUseLongHeight(true)
    } else setUseLongHeight(false)
  }

  return (
    <div className="w-full">
      <div className="w-full bg-cover bg-center flex justify-end items-center h-screen4/5" style={{
        backgroundImage: `url(${defaultBackground})`
      }}>
        <div className="justify-items-auto p-9 text-4xl">
          <h2>Meeting</h2>
          <h2>a bride's</h2>
          <h2>needs.</h2>
        </div>
      </div>
      <div className="w-full p-9 flex flex-col justify-center h-screen/5">
        <div className="p-3"><h4 className="text-3xl text-center">Shop our products</h4></div>
        <div className="flex flex-row justify-center">
          <button className="bg-lightsage hover:bg-lightsage-dark text-white text-center py-2 px-4"
            style={{transition: "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)"}}
          >Products</button>
        </div>
      </div>
      <div style={{padding: 50}} />
      <div className="flex justify-end items-center">
        <div className="w-full grid grid-cols-4 gap-2 p-5">
          <div className="col-span-3 h-screen2/3 bg-cover bg-center rounded-md" style={{
            backgroundImage: `url(${locationImage})`
          }} />
          <div className="h-screen2/3 flex flex-col justify-center">
            <div className="relative torontoRotate" style={{ transform: "translateX(-10em) rotate(10deg)" }}>
              <p className="text-7xl text-darkgreen font-bold" style={{fontFamily: "Farmhouse", fontSize: 200}}>toronto</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-9 flex flex-col justify-center h-screen/5">
        <div className="p-3"><h4 className="text-3xl text-center">Serving the GTA</h4></div>
        <div className="flex flex-row justify-center">
          <button className="bg-lightsage hover:bg-lightsage-dark text-white text-center py-2 px-4"
            style={{transition: "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)"}}
          >Order</button>
        </div>
      </div>
      <div className="w-full p-9 grid grid-cols-2 overflow-hidden" style={{paddingTop: 100}}>
        <div className={`flex flex-col justify-center ${useLongHeight?"h-screen":"h-screen4/5"} w-full text-5xl z-20`}>
          <h4 className="w-full text-center">
            <span className="text-darkgreen bg-gray-200">We</span> can't wait</h4>
          <h4 className="w-full text-center">to meet <span className="text-darkgreen bg-gray-200">you</span>
            <span className="text-lightsage bg-gray-200">!</span>
          </h4>
        </div>
        <div className="w-full z-10">
            <div className="relative" style={{transform: "translateY(6em) translateX(-10em) rotate(-13deg)"}}>
              <div className="absolute top-0 left-0 p-2 w-full">
                <div className="bg-cover bg-center"
                  style={{backgroundImage: `url(${polaroidPic1})`, width: polaroidSizeW, height: polaroidSizeH}}/>
              </div>
              <img className="absolute top-0 left-0" src={polaroid} alt="polaroid frame"/>
            </div>
            <div className="relative" style={{transform: "translateY(6em) translateX(20em) rotate(7deg)"}}>
              <div className="absolute top-0 left-0 p-2 w-full">
                <div className="bg-cover bg-center"
                  style={{backgroundImage: `url(${polaroidPic2})`, width: polaroidSizeW, height: polaroidSizeH}}/>
              </div>
              <img className="absolute top-0 left-0" src={polaroid} alt="polaroid frame"/>
            </div>
        </div>
      </div>
    </div>
  )
}