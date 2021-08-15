import React, { useEffect } from 'react'

import MailOutlineIcon from '@material-ui/icons/MailOutline'
//import './Invoice.css'
import { OrderOutput } from '../../API'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { setIntersepter } from '../../components/utils/Utils'

export interface InvoiceProps {
  invoice: OrderOutput,
  address: string,
}

const _CAPTURE = "capture"
export default function Invoice (props: InvoiceProps) {

  // https://tailwindcomponents.com/component/invoice-generator-build-with-tailwindcss-and-alpinejs
  const [ tooltips, showTooltops ] = React.useState([false, false])
  const [ inPrepMode, setInPrepMode ] = React.useState(false)

  useEffect(() => {
    if (props.invoice) setIntersepter(true)
    else setIntersepter(false)

    return () => { setIntersepter(false) }
  }, [props.invoice])

  const capture = () => {
    showTooltops([false, false]) //if (window.innerWidth <= 991) 
    setInPrepMode(true)
    setTimeout(() => {
      console.log("Time giving for rerender, In Capture ...")
      let el = document.querySelector(`#${_CAPTURE}`) as HTMLElement
      if (el) {
        
        html2canvas(el).then(canvas => {
          let dataURL = canvas.toDataURL('image/png')

          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
          })

          console.log("w:"+el.offsetWidth+" h:"+el.offsetHeight)
          pdf.addImage(dataURL, 'PNG', 0, 0, 210, (el.offsetHeight/el.offsetWidth)*210)
          pdf.save(`Invoice.pdf`)
        }).finally(() => {
          setInPrepMode(false)
        })
      } else {
        console.error(`Could not select html element: #${_CAPTURE}`)
      }
    }, 500)
  }

  return (
      <div id={_CAPTURE} className="pt-12 antialiased sans-serif min-h-screen bg-white w-full" style={{width: inPrepMode?1000:"", minHeight: 900, fontSize: inPrepMode? 15:15}}>
        <div className="container mx-auto py-6 px-4" >
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">Invoice</h2>
            <div>
              <div className="relative mr-4 inline-block">
                <div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" 
                  onMouseOver={() => { showTooltops([true, false]) }} onMouseLeave={() => { showTooltops([false, false]) }}
                  onClick={capture}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                    <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
                    <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
                    <rect x="7" y="13" width="10" height="8" rx="2" />
                  </svg>
                </div>
                <div className={`z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs ${tooltips[0]? "opacity-100":"opacity-0" }`}>
                  Print Invoice
                </div>
              </div>
              
              <div className="relative inline-block">
                <div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center"
                  onMouseOver={() => { showTooltops([false, true]) }} onMouseLeave={() => { showTooltops([false, false]) }}
                >
                  <MailOutlineIcon />
                </div>
                <div className={`z-40 shadow-lg text-center w-32 block absolute right-0 top-0 p-2 mt-12 rounded-lg bg-gray-800 text-white text-xs ${tooltips[1]? "opacity-100":"opacity-0" }`}>
                  Resend Mail
                </div>
              </div>
            </div>
          </div>

          <div className="flex mb-8 justify-between">
            <div className="w-2/4">
              <div className="mb-2 md:mb-1 md:flex items-center">
                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice No.</label>
                <span className="mr-4 inline-block hidden md:block">:</span>
                <div className="flex-1">
                <div className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                >{`INV-${props.invoice.orderId}`}</div>
                </div>
              </div>

              <div className="mb-2 md:mb-1 md:flex items-center">
                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
                <span className="mr-4 inline-block hidden md:block">:</span>
                <div className="flex-1">
                <div className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-52 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker"
                >Monday</div>
                </div>
              </div>

              <div className="mb-2 md:mb-1 md:flex items-center">
                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Due date</label>
                <span className="mr-4 inline-block hidden md:block">:</span>
                <div className="flex-1">
                <div className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-52 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker-2"
                >Mar 17, 2020</div>
                </div>
              </div>
            </div>
            <div>
              {/* <div className="w-32 h-32 mb-1 border rounded-lg overflow-hidden relative bg-gray-100">
                <img id="image" className="object-cover w-full h-32" src="https://placehold.co/300x300/e2e8f0/e2e8f0" />
                
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full block cursor-pointer flex items-center justify-center">
                  <button type="button"
                    style={{backgroundColor: "rgba(255, 255, 255, 0.65)"}}
                    className="hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded-lg shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-camera" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                      <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  </button>
                </div>
              </div>
              <input name="photo" id="fileInput" accept="image/*" className="hidden" type="file" /> */}
            </div>
          </div>

          <div className="flex flex-wrap justify-between mb-8">
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Bill/Ship To:</label>
              <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                {props.invoice.email}
              </div>
              <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                {props.address}
              </div>
              <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                .
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">From:</label>
              <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                {"One Chanhs Co."}
              </div>
              <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                {"RPO STREETSVILLE, MISSISSAUGA ON L5M 0T4"}
              </div>
              <div className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                {"PO BOX 99900 XH 270 734"}
              </div>
            </div>
          </div>

          <div className="flex -mx-1 border-b py-2 items-start">
            <div className="flex-1 px-1">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Item ID.</p>
            </div>

            <div className="px-1 w-20 text-right">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Color</p>
            </div>

            <div className="px-1 w-20 text-right">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Text</p>
            </div>

            <div className="px-1 w-20 text-right">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Size</p>
            </div>

            <div className="px-1 w-20 text-right">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Orr.</p>
            </div>

            <div className="px-1 w-20 text-right">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Add Info.</p>
            </div>

            {/* <div className="px-1 w-32 text-right">
              <p className="leading-none">
                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Unit Price</span>
                <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
              </p>
            </div> */}

            <div className="px-1 w-32 text-right">
              <p className="leading-none">
                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Amount</span>
                <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
              </p>
            </div>

            <div className="px-1 w-20 text-center">
            </div>
          </div>

          { props.invoice.orderItems ? props.invoice.orderItems.map((v, i) => {
              return (
                <div className="flex -mx-1 py-2 border-b">
                  <div className="flex-1 px-1">
                    <p className="text-gray-800" x-text="invoice.name">
                      {v?.itemId}
                    </p>
                  </div>

                  <div className="px-1 w-20 text-right">
                    <p className="text-gray-800" x-text="invoice.qty">
                      {v?.color || "N/A"}
                    </p>
                  </div>

                  <div className="px-1 w-20 text-right">
                    <p className="text-gray-800" x-text="invoice.qty">
                      {v?.text || "N/A"}
                    </p>
                  </div>

                  <div className="px-1 w-32 text-right">
                    <p className="text-gray-800">
                      {v?.orientation || "N/A"}
                    </p>
                  </div>

                  <div className="px-1 w-32 text-right">
                    <p className="text-gray-800">
                      {v?.additionalInstructions || "N/A"}
                    </p>
                  </div>

                  <div className="px-1 w-32 text-right">
                    <p className="text-gray-800" x-text="numberFormat(invoice.total)">
                      {v?.purchasePrice}
                    </p>
                  </div>

                  <div className="px-1 w-20 text-right">
                    <a href="#" className="text-red-500 hover:text-red-600 text-sm font-semibold">Delete</a>
                  </div>
                </div>
              )
            }) : null
          }

          <div className="py-2 ml-auto mt-5 w-full sm:w-2/4 lg:w-1/4">
            <div className="flex justify-between mb-3">
              <div className="text-gray-800 text-right flex-1">Total incl. GST</div>
              <div className="text-right w-40">
                <div className="text-gray-800 font-medium" x-html="netTotal">{props.invoice.totalPrice.toFixed(2)}</div>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <div className="text-sm text-gray-600 text-right flex-1">GST(18%) incl. in Total</div>
              <div className="text-right w-40">
                <div className="text-sm text-gray-600" x-html="totalGST"></div>
              </div>
            </div>
          
            <div className="py-2 border-t border-b">
              <div className="flex justify-between">
                <div className="text-xl text-gray-600 text-right flex-1">Amount due</div>
                <div className="text-right w-40">
                  <div className="text-xl text-gray-800 font-bold" x-html="netTotal">{props.invoice.totalPrice.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}