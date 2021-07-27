import React from 'react'

import StoreItem from "./components/StoreItem"

export default function Products() {

  const [products, setProducts] = React.useState(_temp)

  return (
  <div className="w-full p-4 pt-32 flex justify-center">
    <div className="container mx-lg">
      <div className="pt-20 pb-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-8">
        {products.map((item) => {
          return <StoreItem title={item.title} price={item.price} images={item.images} currency={'CAN'} />
        })}
      </div>
    </div>
  </div>)
}

const _temp = [
  {
    id: "testtesttest",
    title: "Custom Wedding Mug",
    price: 45,
    images: ['https://source.unsplash.com/random']
  },
  {
    id: "testtesttest",
    title: "Custom Wedding Mug",
    price: 45,
    images: ['https://source.unsplash.com/random']
  },
  {
    id: "testtesttest",
    title: "Custom Wedding Mug",
    price: 45,
    images: ['https://source.unsplash.com/random']
  },
  {
    id: "testtesttest",
    title: "Custom Wedding Mug",
    price: 45,
    images: ['https://source.unsplash.com/random']
  },
  {
    id: "testtesttest",
    title: "Custom Wedding Mug",
    price: 45,
    images: ['https://source.unsplash.com/random']
  }
]