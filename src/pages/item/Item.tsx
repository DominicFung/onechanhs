
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

interface StoreItemProps {
  
}

export default function StoreItem(props: StoreItemProps){

  const { id } = useParams() as any

  const [ pictureIndex, setPicutreIndex] = React.useState(0)
  const [ colorIndex, setColorIndex] = React.useState(0)

  const _temp = {
    id: "testtesttest",
    title: "Custom Wedding Mug",
    price: 45,
    images: ['https://source.unsplash.com/random'],
    colors: ['#3a4c17', '#b45d67', '#01aede', '#62d5c4']
  }

  

  return (
    <div className="w-full p-4 pt-32 flex justify-center">
      <div className="container mx-w-2xl">

      
        <div className="pt-20 pb-20 grid grid-cols-6 w-full gap-8">
          <div className="col-span-4">
            <div className="grid grid-cols-6 gap-2">
              <div className="w-full col-span-1">
                <div className="w-full grid grid-flow-row gap-1 justify-end">
                  <div style={{backgroundImage: `url(${_temp.images[0] || "https://klbtheme.com/shopwise/fashion/wp-content/uploads/2020/04/product_img10-1.jpg"}`}}
                    className="w-20 h-20 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60"
                  />
                  <div style={{backgroundImage: `url(${_temp.images[0] || "https://klbtheme.com/shopwise/fashion/wp-content/uploads/2020/04/product_img10-1.jpg"}`}}
                    className="w-20 h-20 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60"
                  />
                  <div style={{backgroundImage: `url(${_temp.images[0] || "https://klbtheme.com/shopwise/fashion/wp-content/uploads/2020/04/product_img10-1.jpg"}`}}
                    className="w-20 h-20 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60"
                  />
                  <div style={{backgroundImage: `url(${_temp.images[0] || "https://klbtheme.com/shopwise/fashion/wp-content/uploads/2020/04/product_img10-1.jpg"}`}}
                    className="w-20 h-20 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60"
                  />
                </div>
              </div>
              <div className="w-full col-span-5">
                <div style={{backgroundImage: `url(${_temp.images[0] || "https://klbtheme.com/shopwise/fashion/wp-content/uploads/2020/04/product_img10-1.jpg"}`}}
                  className="w-full h-screen3/4 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60"
                />
              </div>
            </div>
          </div>
          
          <div className="col-span-2 divide-y divide-gray-300">
            <div className="pb-8">
              <div>
                <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-100 bg-gray-300 rounded-full">#cool</span>
                <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-100 bg-gray-300 rounded-full">#fancy</span>
              </div>
              <h2 className="text-4xl">{_temp.title}</h2>
              <small className="italic text-xs">Product id: {id}</small>
              <div className="custom-number-input h-10 w-32">
                <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">Counter Input
                </label>
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">−</span>
                  </button>
                  <input type="number" className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="0"></input>
                  <button data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="w-full p-2">
              <form className="bg-white rounded pt-2">
                <div className="mb-4 pb-4">
                  {
                    _temp.colors.map((v, i) => {
                      return (
                        <span className="rounded-full h-8 w-8 mr-1 inline-flex items-center justify-center border-2 border-white hover:border-gray-200"
                          style={{backgroundColor: v, borderColor: colorIndex===i?v:""}}  onClick={() => { setColorIndex(i) }}
                        >
                          <span className={`rounded-full h-7 w-7 inline-flex items-center justify-center hover:border-gray-200 hover:border-2
                            ${ colorIndex===i ?  "border-2 border-white" : ""}`} />
                        </span>
                      )
                    })
                  }
                  
                  
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Custom Text
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Text .." />
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}