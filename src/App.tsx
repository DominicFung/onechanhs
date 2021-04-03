import "tailwindcss/tailwind.css"
import './index.css'

import logo from './assets/LogoChanhs.png'
import logo2 from './assets/Logo2.png'

import './fonts/Paradiso.ttf'

// https://www.smashingmagazine.com/2020/02/tailwindcss-react-project/
// https://tailwindcss.com/docs/configuration

// https://tailwindcss.com/docs/guides/create-react-app
export default function App() {
  return (
    <div className="bg-">
      <nav className="flex items-center justify-between flex-wrap bg-lightsage p-6">
        
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-darkgreen border-darkgreen hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full block lg:flex flex-grow lg:items-center lg:w-auto">
          <div className="text-sm">
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4" style={{fontFamily: "Paradiso"}}>
              Home
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4">
              Products
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white">
              Inspo
            </a>
          </div>
          <div className="flex flex-grow" />
          <div className="flex items-center flex-shrink-0 text-white mr-6 p-4">
            {/*<img src={logo} alt="Logo" width={"150px"}/>*/}
            <img src={logo2} alt="Logo" width={"200px"}/>
            {/*<span className="font-semibold text-xl tracking-tight">One Chanhs Co.</span>*/}
          </div>
          <div className="flex flex-grow" />
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4">
            About
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4">
            F.A.Q.
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white mr-4">
            Contact
          </a>
          <div>
            <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-lightsage hover:bg-white mt-4 lg:mt-0">
              Cart
            </a>
          </div>
        </div>
      </nav>
      <div>

      </div>
    </div>
  );
}
