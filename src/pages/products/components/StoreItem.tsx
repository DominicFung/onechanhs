import { Link } from "react-router-dom";


interface StoreItemProps {
  id: string
  title: string
  price: number
  discount?: number
  currency: string,
  images: string[]
}

export default function StoreItem(props: StoreItemProps){
  return (
      <Link className="w-full" to={`/products/${props.id}`}>
        <div className="shadow hover:shadow-lg transition duration-300 ease-in-out xl:mb-0 lg:mb-0 md:mb-0 mb-6 cursor-pointer group">
          <div className="overflow-hidden relative">
            <div style={{backgroundImage: `url(${props.images[0] || "https://source.unsplash.com/random"}`, top: 0, left: 0}}
              className="w-full h-96 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60"
            />
            {/* <div style={{backgroundImage: `url(${props.images[1] || "https://source.unsplash.com/random"}`, top: 0, left: 0}}
              className="w-full h-96 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60"
            /> */}
          </div>
          <div className="px-4 py-3 bg-white">
            <h1 className="text-gray-800 font-semibold text-lg hover:text-red-500 transition duration-300 ease-in-out">
              {props.title}
            </h1>
            <div className="flex py-2">
              <p className="mr-2 text-xs text-gray-600">${props.price} {props.currency}</p>
              { props.discount ?
                <p className="mr-2 text-xs text-red-600 line-through">${props.discount}</p>:null
              }
            </div>
          </div>
        </div>
      </Link>
  )
}