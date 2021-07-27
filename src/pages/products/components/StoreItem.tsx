

interface StoreItemProps {
  title: string
  price: number
  currency: string,
  images: string[]
}

export default function StoreItem(props: StoreItemProps){
  return (
      <div className="w-full">
        <div className="shadow hover:shadow-lg transition duration-300 ease-in-out xl:mb-0 lg:mb-0 md:mb-0 mb-6 cursor-pointer group">
          <div className="overflow-hidden relative">
            <div style={{backgroundImage: `url(${props.images[0] || "https://klbtheme.com/shopwise/fashion/wp-content/uploads/2020/04/product_img10-1.jpg"}`}}
              className="w-full h-96 bg-cover bg-center transition duration-700 ease-in-out group-hover:opacity-60"
            />
            {/* <img className="w-full h-auto position-absolute top-0 left-0 transition duration-700 ease-in-out group-hover:opacity-60" 
              src={props.images[0] || "https://klbtheme.com/shopwise/fashion/wp-content/uploads/2020/04/product_img10-1.jpg"}
              alt="product"
            /> */}
          </div>
          <div className="px-4 py-3 bg-white">
            <a href="#" className="">
              <h1 className="text-gray-800 font-semibold text-lg hover:text-red-500 transition duration-300 ease-in-out">
                {props.title}
              </h1>
            </a>
            <div className="flex py-2">
              <p className="mr-2 text-xs text-gray-600">${props.price} {props.currency}</p>
              <p className="mr-2 text-xs text-red-600 line-through">$15.00</p>
            </div>
          </div>
        </div>
      </div>
  )
}