

const defaultBackground = './assets/mainPhoto.jpg'
const locationImage = './assets/locationImage1.jpg'

export default function Home () {

  return (
    <div className="w-full h-screen">
      <div className="bg-cover bg-center flex justify-end items-center h-screen3/4" style={{
        backgroundImage: `url(${defaultBackground})`
      }}>
        <div className="justify-items-auto p-9 text-4xl">
          <h2>Meeting</h2>
          <h2>a bride's</h2>
          <h2>needs.</h2>
        </div>
      </div>
      <div className="w-full p-9 flex flex-col justify-center h-screen/4">
        <div className="p-3"><h4 className="text-3xl text-center">Shop our products</h4></div>
        <div className="flex flex-row justify-center">
          <button className="bg-lightsage hover:bg-lightsage-dark text-white text-center py-2 px-4">
            Products
          </button>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div className="w-full grid grid-cols-4 gap-2 p-5">
          <div className="col-span-3 h-screen2/3 bg-cover bg-center rounded-md" style={{
            backgroundImage: `url(${locationImage})`
          }} />
          <div className="h-screen2/3 flex flex-col justify-center">
            <div className="relative torontoRotate" style={{ transform: "translateX(-10em) rotate(10deg)" }}>
              <p className="text-7xl text-darkgreen font-bold">Toronto</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-9 flex flex-col justify-center h-screen/4">
        <div className="p-3"><h4 className="text-3xl text-center">Serving the GTA</h4></div>
        <div className="flex flex-row justify-center">
          <button className="bg-lightsage hover:bg-lightsage-dark text-white text-center py-2 px-4">
            Order
          </button>
        </div>
      </div>
    </div>
  )
}