
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import whiteLogo from '../../assets/Logo2.png'
import greenLogo from '../../assets/LogoDarkWords.png'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

export interface NavProps {
  page: string
}

const _eqNavSides = 310
export default function Nav ({ page }: NavProps) {
  const [ isTop, setIsTop ] = React.useState(true)
  const [ useWhiteLogo, setUseWhiteLogo ] = React.useState(true)

  useEffect(() => {
    customSetScroll()
    window.addEventListener('scroll', customSetScroll, true)
    return window.removeEventListener('scroll', customSetScroll)
  }, [])

  const _ISTOPLIMIT = 1
  const _WHITELOGOLIMIT = 550
  const customSetScroll = () => {
    //console.log(window.scrollY)
    if (isTop && window.scrollY > _ISTOPLIMIT) setIsTop(false)
    else setIsTop(true)

    if (useWhiteLogo && window.scrollY > _WHITELOGOLIMIT) setUseWhiteLogo(false)
    else setUseWhiteLogo(true)
  }

  return (
    <nav className="w-full flex items-center justify-between flex-wrap bg-lightsage p-6 fixed z-40" style={{
      //height: isTop ? 155 : 100,
      backgroundColor: isTop ? "": "transparent",
      transition: "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
    }}>
        <div className="w-full flex lg:hidden">
          <img src={whiteLogo} alt="Logo" width={"150px"}/>
          <div className="flex flex-grow" />
          <button className="flex items-center px-3 py-2 border rounded text-darkgreen border-darkgreen hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className="w-full hidden lg:flex flex-grow lg:items-center lg:w-auto lg:visible">
          <div className={`text-sm`} style={{width: _eqNavSides}}>
            <Link to="/" className={`block mt-4 lg:inline-block lg:mt-0 text-black ${
              isTop?"hover:text-white":"hover:text-darkgreen"} mr-4 ${page==="Home"?"font-bold":""}`}>
                Home
            </Link>
            <Link to="/products" className={`block mt-4 lg:inline-block lg:mt-0 text-black ${
              isTop?"hover:text-white":"hover:text-darkgreen"} mr-4 ${page==="Products"?"font-bold":""}`}>
              Products
            </Link>
            <a href="#responsive-header" className={`block mt-4 lg:inline-block lg:mt-0 text-black ${isTop?"hover:text-white":"hover:text-darkgreen"}`}>Inspo</a>
          </div>
          <div className="flex flex-grow" />
          <div className="flex items-center flex-shrink-0 text-white mr-6 p-4">
            { useWhiteLogo ?
              <img src={whiteLogo} alt="Logo" width={isTop? 200 : 150}  style={{transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s"}}/> :
              <img src={greenLogo} alt="Logo" width={isTop? 200 : 150}  style={{transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s"}}/>
            }
          </div>
          <div className="flex flex-grow" />
          <div className={`text-sm flex flex-row items-center justify-between`} style={{width: _eqNavSides-40}}>
            <a href="#responsive-header" className={`block mt-4 lg:inline-block lg:mt-0 text-black ${isTop?"hover:text-white":"hover:text-darkgreen"} mr-4`}>Order</a>
            <a href="#responsive-header" className={`block mt-4 lg:inline-block lg:mt-0 text-black ${isTop?"hover:text-white":"hover:text-darkgreen"} mr-4`}>F.A.Q.</a>
            <a href="#responsive-header" className={`block mt-4 lg:inline-block lg:mt-0 text-black ${isTop?"hover:text-white":"hover:text-darkgreen"} mr-4`}>About</a>
            <div>
              {/*<a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-lightsage hover:bg-white mt-4 lg:mt-0">
                Cart
              </a>*/}
              <Link className={`inline-block text-sm px-4 py-2 hover:text-black ${page==="Cart"?"font-bold text-black":"text-darkgreen" }`}
                style={{transition: "color 0.8s cubic-bezier(0.4, 0, 0.2, 1)"}} to="/cart"
              ><ShoppingCartIcon /></Link>
            </div>
          </div>
        </div>
      </nav>
  )
}