import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Drawer, ListItemText } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CloseIcon from '@material-ui/icons/Close'

export interface RightDrawerProps {
  page: string,
  open: boolean,
  setOpen: (b: boolean) => void
  cartNum: number
}

export default (props: RightDrawerProps) => {

  const [ height, setHeight ] = React.useState(500)

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions, true)
    return () => { 
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  const updateDimensions = () => {
    setHeight(window.innerHeight)
  }

  return (
    <React.Fragment>
      <Drawer anchor={"right"} open={props.open} onClose={() => props.setOpen(false)}>
        <div className="py-8 bg-gray-50 h-full max-w-xs">
          <Link to="/">
            <button className="bg-gray-100 font-semibold hover:bg-gray-200 py-3 text-sm text-darkgreen uppercase px-12 w-full my-1"
              onClick={() => {props.setOpen(false)}}>
              <ListItemText primary={"Home"} />
            </button>
          </Link>
          <Link to="/products">
            <button className="bg-gray-100 font-semibold hover:bg-gray-200 py-3 text-sm text-darkgreen uppercase px-12 w-full my-1"
              onClick={() => {props.setOpen(false)}}>
              <ListItemText primary={"Products"} />
            </button>
          </Link>
          <button className="bg-gray-100 font-semibold hover:bg-gray-200 py-3 text-sm text-darkgreen uppercase px-12 w-full my-1">
            <ListItemText primary={"Inspo"} />
          </button>
          <div className="my-4 mx-1 rounded-xl" style={{height: 2, backgroundColor: "rgba(0,0,0,0.12)"}}/>
          <button className="bg-gray-100 font-semibold hover:bg-gray-200 py-3 text-sm text-darkgreen uppercase px-12 w-full my-1">
            <ListItemText primary={"Order"} />
          </button>
          <button className="bg-gray-100 font-semibold hover:bg-gray-200 py-3 text-sm text-darkgreen uppercase px-12 w-full my-1">
            <ListItemText primary={"F.A.Q"} />
          </button>
          <button className="bg-gray-100 font-semibold hover:bg-gray-200 py-3 text-sm text-darkgreen uppercase px-12 w-full my-1">
            <ListItemText primary={"About"} />
          </button>
          <div className="my-4 mx-1 rounded-xl" style={{height: 2, backgroundColor: "rgba(0,0,0,0.12)"}}/>
          <Link to="/cart">
            <button className="bg-gray-100 font-semibold hover:bg-gray-200 pb-3 pt-4 text-sm text-darkgreen uppercase px-12 w-full my-1"
              onClick={() => {props.setOpen(false)}}
            >
              <ShoppingCartIcon />
              { props.cartNum > 0 ? 
                <span className="relative top-0 right-5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-gray-600 rounded-full"
                  style={{fontSize: 10}}
                >{props.cartNum}</span> : null
              }
            
            </button>
          </Link>
          <div style={{ height: height-605 }} />
          <button className="bg-gray-100 font-semibold hover:bg-gray-200 py-3 text-sm text-darkgreen uppercase px-12 w-full my-1"
            onClick={() => {props.setOpen(false)}}
          >
            <CloseIcon />
          </button>
        </div>
      </Drawer>
    </React.Fragment>
  )
}