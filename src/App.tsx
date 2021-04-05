import "tailwindcss/tailwind.css"
import './index.css'

import React from 'react'

//import './fonts/Paradiso.ttf'
import Navbar from './components/Navbar/Navbar' 
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'

// https://www.smashingmagazine.com/2020/02/tailwindcss-react-project/
// https://tailwindcss.com/docs/configuration

// https://tailwindcss.com/docs/guides/create-react-app
export default function App() {
  const [page, setPage] = React.useState('Home')

  return (
    <div className="">
      <Navbar page={page}/>
      <div className={page === "Home"? "fadeIn": "fadeOut"}>
        <Home />
      </div>
      <Footer />
    </div>
  )
}
