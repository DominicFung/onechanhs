import "tailwindcss/tailwind.css"
import './index.css'

import React from 'react'
import { 
  BrowserRouter as Router, 
  Switch, Route
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
  const [page, setPage] = React.useState('Home')

  return (
    <Router>
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
    </Router>
  )
}
