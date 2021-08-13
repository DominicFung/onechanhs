import "tailwindcss/tailwind.css"
import './index.css'

import React, { useEffect } from 'react'
import { Auth } from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import { 
  Switch, Route, useLocation
} from "react-router-dom"

import Navbar from './components/menu/Navbar' 
import Footer from './components/menu/Footer'

import Home from './pages/home/Home'
import Products from './pages/products/Products'
import Item from './pages/item/Item'
import Cart from './pages/cart/Cart'
import EmptyCart from "./pages/cart/components/EmptyCart"

// https://www.smashingmagazine.com/2020/02/tailwindcss-react-project/
// https://tailwindcss.com/docs/configuration

// https://tailwindcss.com/docs/guides/create-react-app
function App() {
  let location = useLocation()
  const [page, setPage] = React.useState('Home')

  const clearCachedIdentity = async () => {
    console.log('checking credentials ..')
    const creds = await Auth.currentCredentials()
    console.log(creds)
    // if ((creds as any).message?.includes('Access to Identity') && (creds as any).message?.includes('is forbidden')) {
    //   console.log('FORBIDDEN detected: clearing credentails')
    //   window.localStorage.removeItem(`CognitoIdentityId-${config.aws_cognito_identity_pool_id}`)
    //   await Auth.currentCredentials()
    // }
  }

  //useEffect(() => { clearCachedIdentity() }, [])

  useEffect(() => {
    if (location) {
      console.log(location)
      let url = location.pathname
      switch(url) {
        case '/': setPage('Home'); break;
        case '/products': setPage('Products'); break;
        case '/cart': setPage('Cart'); break;
      }
    }
  }, [location])

  return (
      <div className="">
        {/* <AmplifySignOut /> */}
        <Navbar page={page}/>
        
        <Switch>
          <Route path="/products/:id">
            <Item />
          </Route>
          <Route path="/cart">
            <Cart page={page} />
          </Route>
          <Route path="/products">
            <Products page={page} />
          </Route>
          <Route path="/">
            <Home page={page} />
          </Route>
        </Switch>
        <Footer />

        <EmptyCart page={page} />
      </div>
  )
}

export default App
//export default withAuthenticator(App)