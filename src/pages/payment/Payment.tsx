import React, { useEffect, useState } from 'react'
import ReceiptIcon from '@material-ui/icons/Receipt'

import { ReactSVG } from 'react-svg'
import squareLogo from '../../assets/Square_Inc_logo.svg'
/**
 *  Note: I dont trust the @square/web-sdk (it only have 85 weekly downloads)
 *  Instead, I will go with the official CDN but use @square/web-sdk for the typing
 */
// import Square from "@square/web-sdk"
// <script src="https://sandbox.web.squarecdn.com/v1/square.js"></script>

import { squareConfig } from '../../env'

export interface PaymentProps {
  page: string,
  email: string,
  totalPrice: number,
  submitOrder: (paymentPlatform: string, paymentData: string) => void
}

export default (props: PaymentProps) => {

  const [ card, setCard ] = useState<any>()
  const [ paymentState, setPaymentState ] = useState<'SUCCESS'|'FAILURE'|''>('')

  const initializeCard = async (payments: any) => {
    const card = await payments.card()
    await card.attach('#card-container')
    return card
  }

  const createPayment = async (token: string) => {
    const body = JSON.stringify({
      locationId: squareConfig.locationId,
      sourceId: token,
    })

    console.log(body)
    props.submitOrder('SQUARE', body)
  }

  const tokenize = async (paymentMethod: any) => {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === 'OK') {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(
          tokenResult.errors
        )}`;
      }

      throw new Error(errorMessage);
    }
  }

  const handlePaymentMethodSubmission = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, paymentMethod: any) => {
    event.preventDefault();

    try {
      // disable the submit button as we await tokenization and make a payment request.
      //cardButton.disabled = true
      console.log(paymentMethod)
      const token = await tokenize(paymentMethod)
      const paymentResults = await createPayment(token)
      setPaymentState('SUCCESS')

      console.debug('Payment Success', paymentResults);
    } catch (e) {
      //cardButton.disabled = false
      setPaymentState('FAILURE')
      console.error(e.message)
    }
  }

  const main = async () => {
    if (!window.Square) {
      throw new Error('Square.js failed to load properly');
    }

    let payments;
    try {
      payments = window.Square.payments(squareConfig.appId, squareConfig.locationId);
    } catch {
      const statusContainer = document.getElementById('payment-status-container')
      if (statusContainer) {
        statusContainer.className = 'missing-credentials';
        statusContainer.style.visibility = 'visible'
      }
      return
    }

    console.log("pass payments")
    console.log(payments)

    try {
      let card = await initializeCard(payments)
      setCard(card)

      console.log("set card")
      console.log(card)
    } catch (e) {
      console.error('Initializing Card failed', e)
      return
    }

  }

  useEffect( () => {
    if (props.page == "Cart") {
      main()
    }
  }, [props.page])

  return (<div className="pt-40">
    <div className="my-8 py-2 px-2 text-gray-600 bg-gray-300 rounded text-center flex items-center">
      <div className="text-gray-500 w-10 h-10 rounded-full bg-gray-100 inline-flex items-center justify-center">
        <ReceiptIcon />
      </div>
      <span className="h-full pl-2 pr-2">dominic.fung@hotmail.com</span>
    </div>
    <form id="payment-form">
      <div id="card-container"></div>
      <button disabled={!card} className={`${card?"bg-lightsage":"bg-gray-200"} font-semibold ${card?"hover:bg-darkgreen":""} py-3 text-sm text-white uppercase w-full`}
        onClick={(e) => { handlePaymentMethodSubmission(e, card) }} id="card-button" 
      >Pay ${props.totalPrice} CAN</button>
    </form>
    <div id="payment-status-container"></div>
    <div className="w-full flex pt-1">
      <div className="flex-grow"/>
      <div className="text-xs">
        <span>Powered by </span>
        <ReactSVG src={squareLogo} />
      </div>
    </div>
  </div>)

}