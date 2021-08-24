import React, { useEffect } from 'react'

import { API } from 'aws-amplify'
import { listItems } from '../../graphql/queries'
import { StoreItem } from '../../API'
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'

import StoreItemComponent from "./components/StoreItem"

interface ProductProps {
  page: string
}

export default function Products(props: ProductProps) {

  const [products, setProducts] = React.useState<StoreItem[]>([])

  const getAllProducts = async () => {
    let list = await API.graphql({
      query: listItems,
      variables: { limit: 20 },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM
    }) as GraphQLResult<{ listItems?: { storeItems: StoreItem[], nextToken?: string } }>

    console.log(list)
    console.log(list.data?.listItems)
    setProducts(list.data?.listItems?.storeItems || [])
  }

  useEffect(() => {
    if (props.page === "Products" ) {
      getAllProducts()
    }
  }, [props.page])
  

  return (
  <div className="w-full p-4 pt-32 flex justify-center">
    <div className="container mx-lg">
      <div className="pt-20 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-8">
        {products.map((item, i) => {
          return <StoreItemComponent key={i} id={item.itemId}
                    title={item.title} price={item.price} 
                    images={item.pictures ? item.pictures as string[] : ["https://source.unsplash.com/random"]} currency={'CAN'}
                    discount={item.discountPrice ? item.discountPrice : undefined}
                  />
        })}
      </div>
    </div>
  </div>)
}