
import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ItemTab from './ItemTab'

import { API } from 'aws-amplify'
import { StoreItem, HdImageURL, OrderItem } from '../../API'
import { v4 } from 'uuid'

//import { getStoreItemById } from '../../graphql/queries'
import { getStoreItemWithPic, getHDImage } from '../../graphql/queries'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import { getItems, storeItems } from '../../components/utils/LocalStorage'
const _SIDE_PANNEL_ID = "item_side_pannel"

interface StoreItemProps {}

export default function Item(props: StoreItemProps){

  const { id } = useParams() as any
  const [ storeItem, setStoreItem ] = React.useState<StoreItem|null>(null) //StoreItem

  const [sidePannelHeight, setSidePannelHeight] = React.useState(0)
  const sidePannelRef = React.useRef(null)

  const [ pictureIndex, setPicutreIndex] = React.useState(0)
  const [ focusPictureUrl, setFocusPictureUrl ] = React.useState("")

  const [ quantityText, setQuantityText ] = React.useState("1")
  const [ quantity, setQuantity ] = React.useState(1)
  const [ tab, setTab ] = React.useState(0)

  const [ colorChoices, setColorChoices ] = React.useState<number[]>([0])
  const [ customTexts, setCustomTexts ] = React.useState<string[]>([""])
  const [ customInstructions, setCustomInstructions ] = React.useState<string[]>([""])

  const [ isUpdateCart, setIsUpdateCart ] = React.useState(false)
  const [ hasChanged, setHasChanged ] = React.useState(false)

  const getStoreItem = async (id: string) => { 
    let si = await API.graphql({
      query: getStoreItemWithPic,
      variables: { itemId: id },
      authMode: 'AWS_IAM' as any
    }) as GraphQLResult<{ getStoreItemWithPic?: StoreItem }>

    console.log(si.data?.getStoreItemWithPic)
    if (si.data?.getStoreItemWithPic) {
      const storeItem = si.data?.getStoreItemWithPic
      setStoreItem(storeItem || null)
      setFocusPictureUrl(storeItem.focusPictureUrl || "")
    
      const savedOrders = getItems(id)
      const firstOrder = savedOrders.pop()

      if (firstOrder) {
        setIsUpdateCart(true)

        let savedColor = firstOrder.color || ""
        let savedColorIndex = storeItem.colors.indexOf(savedColor)
        let tempColorChoices: number[] = [savedColorIndex && savedColorIndex > 0 ? savedColorIndex : 0]
        let tempCustomText: string[] = [firstOrder.text || ""]
        let tempCustomInstructions: string[] = [firstOrder.additionalInstructions || ""]

        console.log(tempColorChoices)

        for (let order of savedOrders) {
          if (order.color) {
            let i = storeItem?.colors.indexOf(order.color) || -1
            tempColorChoices.push(i > 0 ? i : 0)
          } 
          else { tempColorChoices.push(0) }

          if (order.text) { tempCustomText.push(order.text) }
          else { tempCustomText.push("") }

          if (order.additionalInstructions) { tempCustomInstructions.push(order.additionalInstructions) }
          else { tempCustomInstructions.push("") }
        }

        setColorChoices(tempColorChoices)
        setCustomTexts(tempCustomText)
        setCustomInstructions(tempCustomInstructions)

        setQuantityText(savedOrders.length+1 > 0 ? ""+(savedOrders.length+1) : "1")
      } else { setIsUpdateCart(false) }
      
    } else { console.error(`item ${id} does not exist.`) }

    handleResize()
  }

  const getFocusPicture = async (picKey: string) => {
    if (picKey == "") return
    setFocusPictureUrl("")
    let fp = await API.graphql({
      query: getHDImage,
      variables: { key: picKey },
      authMode: 'AWS_IAM' as any
    }) as GraphQLResult<{getHDImage?: HdImageURL}>

    console.log(fp.data?.getHDImage)
    if (fp.data?.getHDImage?.url) { 
      setFocusPictureUrl(fp.data?.getHDImage.url)
    }
  }

  const addToCart = (si: StoreItem, cc: number[], ct: string[], ai: string[]) => {
    let cartItems: OrderItem[] = []
    for (let i=0; i<colorChoices.length; i++) {
      cartItems.push({
        orderItemId: `local-${v4()}`,
        itemId: id,
        purchasePrice: si.price,
        color: si.colors[cc[i]],
        text: ct[i],
        additionalInstructions: ai[i],
      } as OrderItem)
    }

    console.log(`storing cart items: ${JSON.stringify(cartItems)}`)
    setIsUpdateCart(true)
    storeItems(si.itemId, cartItems)
  }

  useEffect(() => {
    getStoreItem(id)
  }, [id])

  useEffect(() => {
    if (storeItem?.picKeys){
      if (storeItem?.picKeys[pictureIndex]){
        let url = storeItem?.picKeys[pictureIndex]
        getFocusPicture(url || "")
      }
    }
  }, [pictureIndex])

  const handleResize = () => {
    if (sidePannelRef.current) {
      let tempHeight = (sidePannelRef.current as any).clientHeight
      if (tempHeight) setSidePannelHeight(tempHeight)
    }
  }

  useEffect(() => {
    handleResize()
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [sidePannelRef])

  useEffect(() => {
    let i = parseInt(quantityText)
    if (i) { 
      setQuantity(i) 
      if (tab >= i) { setTab(i-1) }

      let oldLen = colorChoices.length
      let dif = i - oldLen

      if (dif > 0)
        for (let a=0; a<dif; a++) {
          colorChoices.push(0)
          customTexts.push("")
          customInstructions.push("")
        }
      else if (dif < 0)
        for (let a=0; a>dif; a--) {
          colorChoices.pop()
          customTexts.pop()
          customInstructions.pop()
        }
      else console.log("No change in i value. OK")

      setColorChoices(colorChoices)
      setCustomTexts(customTexts)
      setCustomInstructions(customInstructions)

    } else { console.warn(`quanity is NAN: ${i}`) }
  }, [quantityText])

  const incrementQuantity = () => {
    console.log("increment quantity")
    let i = parseInt(quantityText)
    if (i >= 1) { setQuantityText(""+(i+1)) }
    else { console.warn(`quanity is NAN: ${i}`) }
  }

  const decrementQuantity = () => {
    console.log("decrement quantity")
    let i = parseInt(quantityText)
    if (i > 1) { setQuantityText(""+(i-1)) }
    else { console.warn(`quanity is NAN: ${i}`) }
  }

  return (
    <div className="w-full p-4 pt-32 flex justify-center pb-24">
      <div className="container mx-w-2xl" style={{ height: sidePannelHeight}}>

        <div className="pt-20 pb-20 grid grid-cols-6 w-full gap-8">
          <div className="col-span-4">
            <div className="grid grid-cols-6 gap-2 h-full">
              <div className="w-full col-span-1">
                <div className="w-full grid grid-flow-row gap-1 justify-end">
                  { storeItem?.pictures?.map((v, i) => {
                      return (
                        <div key={i} style={{
                          backgroundImage: `url(${storeItem?.pictures ? storeItem?.pictures[i] : ""})`, backgroundColor: "#afc4c0",
                          border: pictureIndex == i ? "solid gray 2px" : ""
                        }} onClick={() => { setPicutreIndex(i) }}
                          className="w-20 h-20 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60"
                        />
                      )
                  })}
                </div>
              </div>
              <div className="w-full col-span-5 h-full">
                <div style={{backgroundImage: `url(${focusPictureUrl}), url(${storeItem?.pictures ? storeItem?.pictures[pictureIndex] : ""})`, backgroundColor: "#afc4c0"}}
                  className="w-full h-full bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60"
                />
              </div>
            </div>
          </div>
          
          <div className="col-span-2 divide-y divide-gray-300" id={_SIDE_PANNEL_ID} ref={sidePannelRef}>
            <div className="">
              <div>
                <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-100 bg-gray-300 rounded-full">#cool</span>
                <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-100 bg-gray-300 rounded-full">#fancy</span>
              </div>
              <h2 className="text-4xl">{storeItem?.title}</h2>
              <small className="italic text-xs" style={{fontSize: 10}}>Product id: {id}</small>

              <div className="py-4 text-darkgreen">
                <b>${storeItem?.price.toFixed(2)}</b> {storeItem?.currency}
              </div>

              <p className="m-2 p-4 bg-gray-50 rounded">{storeItem?.description}</p>
              
              <div className="flex flex-row pt-4">
                  <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold pt-3.5">Quantity:</label>
                
                <div className="custom-number-input h-10 w-20">
                  <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <button data-action="decrement" className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                      onClick={decrementQuantity}
                    >
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input type="number" className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" 
                      value={quantityText} onChange={(e) => { setQuantityText(e.target.value) }} />
                    <button data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                      onClick={incrementQuantity}
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>
              { quantity === 1 ? <div className="h-4" /> :
                <div className="w-full mx-auto mt-4 rounded flex">
                  <label className="pt-4">Item:</label>
                  <ul id="tabs" className="inline-flex w-full px-1 pt-2 ">
                    { colorChoices.map((v, i) => {
                      if (i === tab)
                        return (
                          <li key={i} className="px-4 py-2 -mb-px font-semibold text-gray-800 border-b-2 border-blue-400 rounded-t opacity-50">
                            <button onClick={() => { setTab(i) }}>{i+1}</button>
                          </li>)
                      else
                        return (
                          <li key={i} className="px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50">
                            <button onClick={() => { setTab(i) }}>{i+1}</button>
                          </li>)
                    })}
                  </ul>
                </div>
              }
            </div>
            
            <div className="w-full p-2">
              <div className="bg-white rounded pt-2">
                <div className="flex">
                  <label className="block text-gray-700 text-sm font-bold mb-1 mr-5 pt-1.5" htmlFor="username">
                    Colour:
                  </label>
                  <div className="mb-4 pb-4">
                    {
                      storeItem?.colors.map((v, i) => {
                        return (
                          <span className="rounded-full h-8 w-8 mr-1 inline-flex items-center justify-center border-2 border-white hover:border-gray-200"
                            style={{backgroundColor: v||"", borderColor: colorChoices[tab]===i?v||"":""}}  
                            onClick={() => { 
                              colorChoices[tab] = i
                              setColorChoices([...colorChoices]) 
                            }}>
                            <span className={`rounded-full h-7 w-7 inline-flex items-center justify-center hover:border-gray-200 hover:border-2
                              ${ colorChoices[tab]===i ?  "border-2 border-white" : ""}`} />
                          </span>
                        )
                      })
                    }
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Custom Text
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Text" 
                    value={customTexts[tab] || ""} onChange={(e) => {
                      customTexts[tab] = e.target.value
                      setCustomTexts([...customTexts])
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Additional instructions
                  </label>
                  <textarea rows={5}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Instructions" 
                    value={customInstructions[tab]} onChange={(e) => {
                      customInstructions[tab] = e.target.value
                      setCustomInstructions([...customInstructions])
                    }}
                  />
                </div>

                <div className="w-full flex justify-center mb-4">
                    <button className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 p-2 pr-8 pl-8 rounded"
                      onClick={(e) => { 
                        e.preventDefault()
                        if (storeItem) {
                          addToCart( storeItem, colorChoices, customTexts, customInstructions )
                        } else console.log("NO STORE ITEM!")
                      }}
                    >
                      {isUpdateCart ? "Update Cart":"Add to cart"}{quantity === 1 ? "": ` (${quantity})`}
                    </button>
                </div>
                <div className="w-full flex justify-center mb-4">
                  <button className="bg-lightsage text-gray-600 hover:text-gray-300 hover:bg-darkgreen hover:font-bold p-2 pr-8 pl-8 rounded">
                    Buy Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}