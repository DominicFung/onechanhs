import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { OrderItem, StoreItem } from '../../API'
import { clearItems, getAllItems } from '../../components/utils/LocalStorage'
import { listItems } from '../../graphql/queries'

import { API } from 'aws-amplify'
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'
import { EditRounded } from '@material-ui/icons'

import Invoice from '../invoice/Invoice'
import { createOrder } from '../../graphql/mutations'

const AvailableLocations = [
  "Brampton, Ontario",
  "Etobicoke, Ontario",
  "Oakvile, Ontario",
  "Mississauga, Ontario",
  "Milton, Ontario",
  "Toronto, Ontario"
]

export interface CartProps {
  page: string
}

interface OrderItemWithQuantity extends OrderItem {
  quantity: number
}

export default function Cart (props: CartProps) {
  const [ isCheckedOut, setIsCheckedOut ] = React.useState(false)

  const [ storeMap, setStoreMap ] = React.useState<{[key: string]: StoreItem}>({})
  const [ originalItems, setOriginalItems ] = React.useState<OrderItem[]>([])
  const [ orderItems, setOrderItems ] = React.useState<OrderItemWithQuantity[]>([])

  const [ totalQuantity, setTotalQuantity ] = React.useState(0)
  const [ subTotalPrice, setSubtotalPrice ] = React.useState(0)
  const [ shippingOption, setShippingOption ] = React.useState("ship-10")

  const [ address, setAddress ] = React.useState("")
  const [ citystate, setCityState ] = React.useState("default")
  const [ country, setCountry ] = React.useState("Canada")
  const [ postal, setPostal ] = React.useState("")

  const [ email, setEmail] = React.useState("")

  const shipMap = {
    "ship-10": 10, 
    "friend":  0
  } as {[key: string]: number}

  const [ totalPrice, setTotalPrice ] = React.useState(0)
  let history = useHistory()

  useEffect(() => {
    setTotalPrice(subTotalPrice + shipMap[shippingOption] || 10)
  }, [subTotalPrice, shippingOption])

  const getStoreItems = async () => {
    let list = await API.graphql({
      query: listItems,
      variables: { limit: 1000 }, // We need something more economical
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    }) as GraphQLResult<{ listItems?: { storeItems: StoreItem[], nextToken?: string } }>

    console.log(list)
    console.log(list.data?.listItems)

    let temp = list.data?.listItems?.storeItems || []
    let map = {} as {[key: string]: StoreItem}
    for (let item of temp) {
      map[item.itemId] = item
    }
    setStoreMap(map)
  }

  useEffect(() => {
    if (props.page === 'Cart') {
      getStoreItems()
      
      const list = getAllItems()
      setOriginalItems(list)
      const orderItems: OrderItemWithQuantity[] = []
      let orderMap: {[key: string]: number} = {}
      
      let i = 0
      let t = 0
      for (let order of list) {
        if (!orderMap[order.itemId] && orderMap[order.itemId] !== 0) {
          orderMap[order.itemId] = i
          orderItems.push({...order, quantity: 1})
        } else {
          let p = orderMap[order.itemId]
          orderItems[p].quantity = orderItems[p].quantity + 1
        }
        t=t+order.purchasePrice; i++
      }

      setTotalQuantity(i)
      setSubtotalPrice(t)

      console.log( orderItems )
      setOrderItems( orderItems )
    }
  }, [props.page])

  const submitOrder =  async (
    items: OrderItem[], address: string, city: string, state: string, country: string
  ) => {

    const subOrder = await API.graphql({
        query: createOrder,
        variables: {
          items, address, city, state, country
        },
        authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    }) as GraphQLResult
  }

  return (
    <div className="w-full p-4 pt-32 flex justify-center pb-24">

      { isCheckedOut ? <Invoice /> : 
        <div className="container mx-xl mt-10">
          <div className="grid grid-cols-6 space-x-8">

          <div className="flex shadow-md my-2 flex-col col-span-6 lg:col-span-4">
            <div className="w-full bg-white px-8 pt-8 pb-2">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">{totalQuantity} Items</h2>
              </div>
              <div className="flex mt-2 mb-2">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
              </div>
            </div>

              {/* Product */}
              { orderItems.map((v, i) => {
                  return (
                    <div key={i} className="flex items-center hover:bg-gray-100 mx-8 px-1 py-2">
                      <div className="flex w-2/5"> 
                        <div className="w-20 h-20 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60" 
                          style={{backgroundImage: `url(${storeMap[v.itemId]? storeMap[v.itemId].pictures![0] : "https://klbtheme.com/shopwise/fashion/wp-content/uploads/2020/04/product_img10-1.jpg"}`}} 
                        />
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">{storeMap[v.itemId]? storeMap[v.itemId].title : "Item"}</span>
                          <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        <input className="mx-2 border text-center w-8" type="text" defaultValue={v.quantity || "0"} />
                        <button className="fill-current text-gray-600 w-2"><EditRounded style={{fontSize: 15}} /></button>
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">${storeMap[v.itemId] ? storeMap[v.itemId]!.price.toFixed(2) : "N/A"}</span>
                      <span className="text-center w-1/5 font-semibold text-sm">${storeMap[v.itemId] ? (storeMap[v.itemId]!.price * v.quantity).toFixed(2) : "N/A"}</span>
                    </div>
                  )
                })
                
              }
              <button className="flex font-semibold text-indigo-600 text-sm my-8 mx-8"
                onClick={history.goBack}
              >
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                Back to Shopping
              </button>
              <div style={{flexGrow: 1}} />
              <div className="w-full px-2 py-6 flex" style={{justifyContent: "center"}}>
                <button className="bg-gray-300 font-semibold hover:bg-gray-600 py-3 text-sm text-white uppercase px-10"
                  onClick={() => { 
                    document.body.dispatchEvent(new CustomEvent('cartDelete', {
                      detail: { show: true }
                    }))
                  }}
                >Clear Cart</button>
              </div>
            </div>


            <div id="summary" className="w-full px-8 py-10 col-span-6 lg:col-span-2">
              <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Items ({totalQuantity})</span>
                <span className="font-semibold text-sm">{subTotalPrice.toFixed(2)}$</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                <select className="block p-2 text-gray-600 w-full text-sm" value={shippingOption} onChange={(e) => { setShippingOption(e.target.value) }}>
                  <option value="ship-10">Standard shipping - $10.00</option>
                  <option value="friend">Friendship (Lois will contact you)</option>
                </select>
              </div>
                <div className="py-2">
                  <label htmlFor="email" className="font-semibold inline-block mb-3 text-sm uppercase">Email</label>
                  <input type="text" id="email" placeholder="Email" className="p-2 text-sm w-full outline-black" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              <div className="py-4">
                <h4 className="py-2">Delivery Info / Shipping:</h4>
                <div className="py-2">
                  <label htmlFor="address" className="font-semibold inline-block mb-3 text-sm uppercase">Address</label>
                  <input type="text" id="address" placeholder="Address" className="p-2 text-sm w-full outline-black"
                    value={address} onChange={(e) => setAddress(e.target.value) }
                  />
                </div>
                <div className="py-2">
                  <label htmlFor="city" className="font-semibold inline-block mb-3 text-sm uppercase">City &amp; Province/State</label>
                  <select id="city" placeholder="City &amp; Province/State" className="p-2 text-sm w-full outline-black"
                    value={citystate} onChange={(e) => setCityState(e.target.value) }
                  >
                    <option value="default" className="gray-200">Please Choose .. </option>
                    {AvailableLocations.map((l, i) => {
                      return <option key={i} value={l}>{l}</option>
                    })}
                  </select>
                </div>
                <div className="py-2">
                  <label htmlFor="country" className="font-semibold inline-block mb-3 text-sm uppercase">Country</label>
                  <input type="text" id="country" placeholder="Country" className="p-2 text-sm w-full outline-black" 
                    value={country} disabled onChange={() => {}}
                  />
                </div>
                <div className="py-2">
                  <label htmlFor="postal" className="font-semibold inline-block mb-3 text-sm uppercase">Postal Code</label>
                  <input type="text" id="postal" placeholder="Postal Code" className="p-2 text-sm w-full outline-black" 
                    value={postal} onChange={(e) => { setPostal(e.target.value) }}
                  />
                </div>
              </div>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="bg-lightsage font-semibold hover:bg-darkgreen py-3 text-sm text-white uppercase w-full"
                  onClick={() => { setIsCheckedOut(true) }}
                >Checkout</button>
              </div>
            </div>


          </div>
        </div> }

        
    </div>
  )
}