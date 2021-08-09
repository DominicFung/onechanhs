import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

import config from './aws-exports'
import Amplify from 'aws-amplify'



Amplify.configure({
  Auth: {
    region:               config.aws_cognito_region,
    userPoolId:           config.aws_user_pools_id,
    identityPoolId:       config.aws_cognito_identity_pool_id,
    userPoolWebClientId:  config.aws_user_pools_web_client_id,
    mandatorySignIn:      false
  },
})

const myAppConfig = {
  'aws_appsync_graphqlEndpoint': config.aws_appsync_graphqlEndpoint,
  'aws_appsync_region': config.aws_appsync_region,
  'aws_appsync_authenticationType': 'AMAZON_COGNITO_USER_POOLS'
}

Amplify.configure(myAppConfig)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
