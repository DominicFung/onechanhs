import "tailwindcss/tailwind.css"
import './index.css'

import React, { useEffect } from 'react'
import { 
  Switch, Route, useLocation
} from "react-router-dom"

import Navbar from './components/menu/Navbar' 
import Footer from './components/menu/Footer'

import Home from './pages/home/Home'
import Products from './pages/products/Products'
import Item from './pages/item/Item'

// https://www.smashingmagazine.com/2020/02/tailwindcss-react-project/
// https://tailwindcss.com/docs/configuration

// https://tailwindcss.com/docs/guides/create-react-app
export default function App() {
  let location = useLocation()
  const [page, setPage] = React.useState('Home')

  useEffect(() => {
    if (location) {
      console.log(location)
      let url = location.pathname
      switch(url) {
        case '/': setPage('Home'); break;
        case '/products': setPage('Products'); break;
      }
    }
  }, [location])

  return (
      <div className="">
        <Navbar page={page}/>
        
        <Switch>
          <Route path="/products/:id">
            <Item />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </div>
  )
}
