import React from 'react'

import MailOutlineIcon from '@material-ui/icons/MailOutline'
import './Invoice.css'

export default function Invoice () {

  // https://tailwindcomponents.com/component/invoice-generator-build-with-tailwindcss-and-alpinejs

  const _temp = [{
    
  }]

  const [ tooltips, showTooltops ] = React.useState([false, false])

  return (
      <div className="pt-12 antialiased sans-serif min-h-screen bg-white" style={{minHeight: 900}}>
        <div 
          className="container mx-auto py-6 px-4"
          x-data="invoices()"
          x-init="generateInvoiceNumber(111111, 999999);"
          x-cloak
        >
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-6 pb-2 tracking-wider uppercase">Invoice</h2>
            <div>
              <div className="relative mr-4 inline-block">
                <div className="text-gray-500 cursor-pointer w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-300 inline-flex items-center justify-center" 
                  onMouseOver={() => { showTooltops([true, false]) }} onMouseLeave={() => { showTooltops([false, false]) }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="eg. #INV-100001" x-model="invoiceNumber" />
                </div>
              </div>

              <div className="mb-2 md:mb-1 md:flex items-center">
                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Invoice Date</label>
                <span className="mr-4 inline-block hidden md:block">:</span>
                <div className="flex-1">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker" type="text" id="datepicker1" placeholder="eg. 17 Feb, 2020" x-model="invoiceDate" /*x-on:change="invoiceDate = document.getElementById('datepicker1').value" autocomplete="off" readonly*/ />
                </div>
              </div>

              <div className="mb-2 md:mb-1 md:flex items-center">
                <label className="w-32 text-gray-800 block font-bold text-sm uppercase tracking-wide">Due date</label>
                <span className="mr-4 inline-block hidden md:block">:</span>
                <div className="flex-1">
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 js-datepicker-2" id="datepicker2" type="text" placeholder="eg. 17 Mar, 2020" x-model="invoiceDueDate" /*x-on:change="invoiceDueDate = document.getElementById('datepicker2').value" autocomplete="off" readonly*/ />
                </div>
              </div>
            </div>
            <div>
              <div className="w-32 h-32 mb-1 border rounded-lg overflow-hidden relative bg-gray-100">
                <img id="image" className="object-cover w-full h-32" src="https://placehold.co/300x300/e2e8f0/e2e8f0" />
                
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full block cursor-pointer flex items-center justify-center" /*onClick="document.getElementById('fileInput').click()"*/>
                  <button type="button"
                    style={{backgroundColor: "rgba(255, 255, 255, 0.65)"}}
                    className="hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 text-sm border border-gray-300 rounded-lg shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-camera" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                      <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                  </button>
                </div>
              </div>
              <input name="photo" id="fileInput" accept="image/*" className="hidden" type="file" /*onChange="let file = this.files[0]; 
                var reader = new FileReader();

                reader.onload = function (e) {
                  document.getElementById('image').src = e.target.result;
                  document.getElementById('image2').src = e.target.result;
                };
              
                reader.readAsDataURL(file);
              " */ />
            </div>
          </div>

          <div className="flex flex-wrap justify-between mb-8">
            <div className="w-full md:w-1/3 mb-2 md:mb-0">
              <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Bill/Ship To:</label>
              <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Billing company name" x-model="billing.name" />
              <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Billing company address" x-model="billing.address" />
              <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Additional info" x-model="billing.extra" />
            </div>
            <div className="w-full md:w-1/3">
              <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">From:</label>
              <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Your company name" x-model="from.name"/>

              <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Your company address" x-model="from.address"/>

              <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" placeholder="Additional info" x-model="from.extra"/>
            </div>
          </div>

          <div className="flex -mx-1 border-b py-2 items-start">
            <div className="flex-1 px-1">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Description</p>
            </div>

            <div className="px-1 w-20 text-right">
              <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">Units</p>
            </div>

            <div className="px-1 w-32 text-right">
              <p className="leading-none">
                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Unit Price</span>
                <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
              </p>
            </div>

            <div className="px-1 w-32 text-right">
              <p className="leading-none">
                <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">Amount</span>
                <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
              </p>
            </div>

            <div className="px-1 w-20 text-center">
            </div>
          </div>
              
              {_temp}
              <div className="flex -mx-1 py-2 border-b">
                <div className="flex-1 px-1">
                  <p className="text-gray-800" x-text="invoice.name"></p>
                </div>

                <div className="px-1 w-20 text-right">
                  <p className="text-gray-800" x-text="invoice.qty"></p>
                </div>

                <div className="px-1 w-32 text-right">
                  <p className="text-gray-800" x-text="numberFormat(invoice.rate)"></p>
                </div>

                <div className="px-1 w-32 text-right">
                  <p className="text-gray-800" x-text="numberFormat(invoice.total)"></p>
                </div>

                <div className="px-1 w-20 text-right">
                  <a href="#" className="text-red-500 hover:text-red-600 text-sm font-semibold" /*@click.prevent="deleteItem(invoice.id)"*/>Delete</a>
                </div>
              </div>

          <div className="py-2 ml-auto mt-5 w-full sm:w-2/4 lg:w-1/4">
            <div className="flex justify-between mb-3">
              <div className="text-gray-800 text-right flex-1">Total incl. GST</div>
              <div className="text-right w-40">
                <div className="text-gray-800 font-medium" x-html="netTotal"></div>
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
                  <div className="text-xl text-gray-800 font-bold" x-html="netTotal"></div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Print Template --> */}
          <div id="js-print-template" x-ref="printTemplate" className="hidden">
            <div className="mb-8 flex justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-6 pb-2 tracking-wider uppercase">Invoice</h2>

                <div className="mb-1 flex items-center">
                  <label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Invoice No.</label>
                  <span className="mr-4 inline-block">:</span>
                  <div x-text="invoiceNumber"></div>
                </div>
          
                <div className="mb-1 flex items-center">
                  <label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Invoice Date</label>
                  <span className="mr-4 inline-block">:</span>
                  <div x-text="invoiceDate"></div>
                </div>
          
                <div className="mb-1 flex items-center">
                  <label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">Due date</label>
                  <span className="mr-4 inline-block">:</span>
                  <div x-text="invoiceDueDate"></div>
                </div>
              </div>
              <div className="pr-5">
                <div className="w-32 h-32 mb-1 overflow-hidden">
                  <img id="image2" className="object-cover w-20 h-20" />
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-10">
              <div className="w-1/2">
                <label className="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">Bill/Ship To:</label>
                <div>
                  <div x-text="billing.name"></div>
                  <div x-text="billing.address"></div>
                  <div x-text="billing.extra"></div>
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-gray-800 block mb-2 font-bold text-xs uppercase tracking-wide">From:</label>
                <div>
                  <div x-text="from.name"></div>
                  <div x-text="from.address"></div>
                  <div x-text="from.extra"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-1 border-b py-2 items-start">
              <div className="flex-1 px-1">
                <p className="text-gray-600 uppercase tracking-wide text-xs font-bold">Description</p>
              </div>
        
              <div className="px-1 w-32 text-right">
                <p className="text-gray-600 uppercase tracking-wide text-xs font-bold">Units</p>
              </div>
        
              <div className="px-1 w-32 text-right">
                <p className="leading-none">
                  <span className="block uppercase tracking-wide text-xs font-bold text-gray-600">Unit Price</span>
                  <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
                </p>
              </div>
        
              <div className="px-1 w-32 text-right">
                <p className="leading-none">
                  <span className="block uppercase tracking-wide text-xs font-bold text-gray-600">Amount</span>
                  <span className="font-medium text-xs text-gray-500">(Incl. GST)</span>
                </p>
              </div>
            </div>
            <template x-for="invoice in items" /*:key="invoice.id"*/>
              <div className="flex flex-wrap -mx-1 py-2 border-b">
                <div className="flex-1 px-1">
                  <p className="text-gray-800" x-text="invoice.name"></p>
                </div>
        
                <div className="px-1 w-32 text-right">
                  <p className="text-gray-800" x-text="invoice.qty"></p>
                </div>
        
                <div className="px-1 w-32 text-right">
                  <p className="text-gray-800" x-text="numberFormat(invoice.rate)"></p>
                </div>
        
                <div className="px-1 w-32 text-right">
                  <p className="text-gray-800" x-text="numberFormat(invoice.total)"></p>
                </div>
              </div>
            </template>

            <div className="py-2 ml-auto mt-20" style={{width: 320}}>
              <div className="flex justify-between mb-3">
                <div className="text-gray-800 text-right flex-1">Total incl. GST</div>
                <div className="text-right w-40">
                  <div className="text-gray-800 font-medium" x-html="netTotal"></div>
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
                    <div className="text-xl text-gray-800 font-bold" x-html="netTotal"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /Print Template --> */}

          {/* <!-- Modal --> */}
          {/* <div style={{backgroundColor: "rgba(0, 0, 0, 0.8)"}} className="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full" /*x-show.transition.opacity="openModal">
            <div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
              <div className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
                /*x-on:click="openModal = !openModal">
                <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                </svg>
              </div>

              <div className="shadow w-full rounded-lg bg-white overflow-hidden w-full block p-8">
                
                <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Fill your services</h2>
              
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Description</label>
                  <input className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" x-model="item.name" />
                </div>

                <div className="flex">
                  <div className="mb-4 w-32 mr-2">
                    <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Units</label>
                    <input className="text-right mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" x-model="item.qty" />
                  </div>
            
                  <div className="mb-4 w-32 mr-2">
                    <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Unit Price</label>
                    <input className="text-right mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" x-model="item.rate" />
                  </div>

                  <div className="mb-4 w-32">
                    <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Amount</label>
                    <input className="text-right mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" x-model="item.total = item.qty * item.rate" />
                  </div>
                </div>
            
                <div className="mb-4 w-32"> 
                  <div className="relative">
                    <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">GST</label>
                    <select className="text-gray-700 block appearance-none w-full bg-gray-200 border-2 border-gray-200 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500" x-model="item.gst">
                      <option value="5">GST 5%</option>
                      <option value="12">GST 12%</option>
                      <option value="18">GST 18%</option>
                      <option value="28">GST 28%</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                      <svg className="fill-current h-4 w-4 mt-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
        
                <div className="mt-8 text-right">
                  <button type="button" className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm mr-2" /*@click="openModal = !openModal">
                    Cancel
                  </button>	
                  <button type="button" className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow-sm" /*@click="addItem()">
                    Add Item
                  </button>	
                </div>
              </div>
            </div>
          </div> */}
          {/* <!-- /Modal --> */}
        </div>
      </div>
  )
}