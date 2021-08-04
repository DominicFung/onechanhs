import React from 'react'
import Invoice from '../invoice/Invoice'

export default function Cart () {

  const _temp = [{
    id: "testtesttest",
    title: "Custom Wedding Mug",
    price: 45,
    images: ['https://source.unsplash.com/random'],
    colors: ['#3a4c17', '#b45d67', '#01aede', '#62d5c4'],
    description: "This is a fake description of the wedding cup. Its cool, buy it."
  },
  {
    id: "testtesttest",
    title: "Custom Wedding Mug",
    price: 45,
    images: ['https://source.unsplash.com/random'],
    colors: ['#3a4c17', '#b45d67', '#01aede', '#62d5c4'],
    description: "This is a fake description of the wedding cup. Its cool, buy it."
  },
  {
    id: "testtesttest",
    title: "Custom Wedding Mug",
    price: 45,
    images: ['https://source.unsplash.com/random'],
    colors: ['#3a4c17', '#b45d67', '#01aede', '#62d5c4'],
    description: "This is a fake description of the wedding cup. Its cool, buy it."
  }]

  const [ isCheckedOut, setIsCheckedOut ] = React.useState(false)

  return (
    <div className="w-full p-4 pt-32 flex justify-center pb-24">

      { isCheckedOut ? <Invoice /> : 
        <div className="container mx-xl mt-10">
          <div className="grid grid-cols-6 space-x-8">

          <div className="flex shadow-md my-2 flex-col col-span-6 lg:col-span-4">
            <div className="w-full bg-white px-8 pt-8 pb-2">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">3 Items</h2>
              </div>
              <div className="flex mt-2 mb-2">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
              </div>
            </div>

              {/* Product */}
              { _temp.map((v, i) => {
                  return (
                    <div className="flex items-center hover:bg-gray-100 mx-8 px-0 py-2">
                      <div className="flex w-2/5"> 
                        <div className="w-20 h-20 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60" style={{backgroundImage: `url(${v.images[0] || "https://klbtheme.com/shopwise/fashion/wp-content/uploads/2020/04/product_img10-1.jpg"}`}} />
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">{v.title}</span>
                          <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                        </svg>

                        <input className="mx-2 border text-center w-8" type="text" value="1" />

                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                        </svg>
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">${v.price}</span>
                      <span className="text-center w-1/5 font-semibold text-sm">$400.00</span>
                    </div>
                  )
                })
                
              }
              <a href="#" className="flex font-semibold text-indigo-600 text-sm my-8 mx-8">
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                Continue Shopping
              </a>
            </div>


            <div id="summary" className="w-full px-8 py-10 col-span-6 lg:col-span-2">
              <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">Items 3</span>
                <span className="font-semibold text-sm">590$</span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - $10.00</option>
                  <option>Friendship (Lois will contact you)</option>
                </select>
              </div>
              <div className="py-10">
                <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
              </div>
              <button className="bg-gray-500 hover:bg-gray-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>$600</span>
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